const app = require('express')()
const  bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql');

const jwt = require('jsonwebtoken');
const secretKey = '1QR!35dE'; // Keep this secret

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'vications'
});

conn.connect()

app.get('/', (req, res) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.verify(token, secretKey);
    if (user) {
        conn.query('SELECT type,first,last FROM users WHERE id = ' + user.id,(err,results)=>{
            let type = results[0].type
            let first = results[0].first
            let last = results[0].last
            let sql = `SELECT users.first,users.last,vacation.*
                      FROM ((followers
                      INNER JOIN users ON users.id = followers.userID)
                      INNER JOIN vacation ON vacation.id = followers.vacationID) WHERE users.id = ${user.id} ORDER BY start DESC`

          conn.query(sql,(err,results)=>{

            let followers = results
            if(req.query.pagenumber){
                  conn.query('SELECT * FROM vacation',(err,results)=>{

                    let length = Math.ceil(results.length / 10);
                    let pagenumber = req.query.pagenumber;

                    if (length === 0 ) {
                      length = 1;
                    }
                    if(pagenumber < 1 ){
                        pagenumber = 1
                    }else if(pagenumber > length){
                        pagenumber = length
                    }

                    conn.query(`SELECT * FROM vacation ORDER BY start DESC LIMIT 10 OFFSET ${pagenumber * 10 - 10}`,(err,results)=>{
                        res.send([results,followers,length,type,first,last])
                    })

                  })
            }else{
                sql = 'SELECT vacation.* FROM followers INNER JOIN vacation ON followers.vacationID = vacation.id GROUP BY vacation.id ORDER BY vacation.followers'
                conn.query(sql,(err,results)=>{
                    res.send([results])        
                })

            }
          }) 
        })
    }
} catch (error) {
    if(error){
      res.send(error)
    }
}
});

app.post('/follow',(req,res) => {
    const token = req.headers.authorization;
    const user = jwt.verify(token, secretKey);
    conn.query(`SELECT * FROM followers WHERE vacationID = ${req.body.vacationId} AND userID = ${user.id}`,(err,results)=>{
        let sql;
        if(results.length === 0 ){
            sql = `INSERT INTO followers (userID, vacationID) VALUES ("${user.id}", "${req.body.vacationId}")`
        }else{
          conn.query((err,results)=>{
              
          })
          sql = `DELETE FROM followers WHERE vacationID = ${req.body.vacationId} AND userID = ${user.id}`
        }
        conn.query(sql,(err,results)=>{
            let action = results
            conn.query('SELECT * FROM followers WHERE vacationID = ' + req.body.vacationId,(err,results)=>{
                conn.query(`UPDATE vacation SET followers = ${results.length} WHERE id = ${req.body.vacationId}`,(err,results)=>{
                    res.send(action)
                })

            })
        })
    })
})

app.delete('/delete',(req,res) => {
  const token = req.headers.authorization;
  const user = jwt.verify(token, secretKey);
  conn.query('SELECT type FROM users WHERE id = ' + user.id,(err,results)=>{
      if(results[0].type === 'admin'){
          conn.query(`DELETE FROM vacation WHERE id = ${req.query.id}`,(err,results)=>{
            res.send({"action":"deleted"})
          })
      }else if(results[0].type === 'user'){
          jwt.destroy(token)
      }
  })
})

app.put('/edit',(req,res) => {
  const token = req.headers.authorization;
  const user = jwt.verify(token, secretKey);
  conn.query('SELECT type FROM users WHERE id = ' + user.id,(err,results)=>{
      if(results[0].type === 'admin'){
        let sql = 'UPDATE vacation SET ';
        for (const key in req.body[0]) {
          sql += `${key} = '${req.body[0][key]}', `;
        }
        sql = sql.slice(0, -2);
        sql += ' WHERE id = ' + req.body[1]; 

        conn.query(sql,(err,results)=>{
          if(err){
            console.log(err)
          }else{
            res.send({"action":"edited"})
          }

        })
      }else if(results[0].type === 'user'){
          jwt.destroy(token)
      }
  })
})

app.post('/add',(req,res) => {
  const token = req.headers.authorization;
  const user = jwt.verify(token, secretKey);
  conn.query('SELECT type FROM users WHERE id = ' + user.id,(err,results)=>{
      if(results[0].type === 'admin'){
        let keys = ''
        let values = '';
        
        for (const key in req.body) {
          keys += `${key}, `;
          values += `"${req.body[key]}", `;
        }

        keys = keys.slice(0,-2)
        values = values.slice(0,-2)
        let sql = `INSERT INTO vacation (${keys}, followers) VALUES (${values}, "0")`
          conn.query(sql,(err,results)=>{
            if(err){
              console.log(err)
            }else{
              res.send({"action":"added"})
            }
          })
      }
  })
})


app.post('/register',(req,res) => {
    conn.query('SELECT * FROM users',(err,results)=>{
        let emails = []
        for(i=0;i<results.length;i++){
            emails.push(results[i].user_name)
        }
        if(!emails.includes(req.body.email)){
            conn.query(`INSERT INTO users (first, last, user_name,password) VALUES ("${req.body.firstName}", "${req.body.lastName}", "${req.body.email}", "${req.body.password}" )`, (err,results)=>{
                res.send({"status":"success"})
            })
        }else{
            res.send({"status":"Email already exist"})
        }
    })
})

app.post('/login',(req,res) => {
    conn.query(`SELECT * FROM users WHERE user_name = "${req.body.email}" AND password = "${req.body.password}"`,(err,results)=>{
      if(err){
          res.send({"status":"Email or Pasword incorrect"})
      }else{
          const payload = {
            username: results[0].user_name,
            id:results[0].id
          };
        
          const token = jwt.sign(payload, secretKey, { expiresIn: '3h' });
          res.json({token})
      }
    })
})

app.listen('3030',console.log('listening to 3030'))
