import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './vacation.css'
import Card from '../card/card';
import NavBar from '../navbar/navbar';
import { UserAuth } from '../../context/AuthContext';
import Pagination from '../pagination/pagination';
import { useNavigate } from "react-router-dom";

function Vacation() {
  const navigate = useNavigate();

  const [vacation,setVacation] = useState([])
  const [followers,setfollowers] = useState([])
  const {user, logout,setTypeOfUser, setFirst, setLast,typeOfUser} = UserAuth()
  const [totalPages,settotalPages] = useState(1)
  const [pageNumber, setPageNumber] = useState(1);
  const [isActive, setIsActive] = useState(false);


  const getData = async () => {
    if(user){
        const jwtToken = JSON.parse(localStorage.getItem('jwtToken'));
        const {data} = await axios.get(`http://localhost:3030/?pagenumber=${pageNumber}`,{
          headers:{
            'Authorization': jwtToken.data.token,
          }
        });
        if(data.message === "jwt expired"){
          logout()
        }else{
            console.log(data)
            setVacation(data[0])
            setfollowers(data[1])
            settotalPages(data[2])
            setTypeOfUser(data[3])
            setFirst(data[4])
            setLast(data[5])
        }
    }
  }

  useEffect(()=>{
    getData();
  },[pageNumber])


  const isFollowing = (vacationId) => {
    return followers.some((follower) => follower.id === vacationId);
  };

  const handleFollow = async (vacationId) => {
      const jwtToken = JSON.parse(localStorage.getItem('jwtToken'));
      const config = {
        headers: {
          'Authorization': jwtToken.data.token,
        },
      };

      const data = {
        vacationId: vacationId,
      };

      try {
        const response = await axios.post('http://localhost:3030/follow', data, config)
        if(response.data){
          getData()
        }
      } catch (error) {
        console.error('Error following vacation:', error);
      }
      
  };

  const handleDelete = async (vacationId,index) => {
          const jwtToken = JSON.parse(localStorage.getItem('jwtToken'));
          const config = {
            headers: {
              'Authorization': jwtToken.data.token,
            },
          };
          
          try {
            const response = await axios.delete('http://localhost:3030/delete?id=' + vacationId, config)
            if(response.data.action === "deleted"){
              let all = [...vacation]
               all.splice(index,1)
              setVacation(all)
              if(vacation.length === 1){
                settotalPages(totalPages-1)
                setPageNumber(pageNumber-1)
              }
            }
          } catch (error) {
            console.error('Error following vacation:', error);
          }
  }
      
  return (
        <div id='vacation-wrap'>
            <div>
                <NavBar isActive={isActive} setIsActive={setIsActive} />
                <div className='container'>
                    {typeOfUser === 'admin' && <div id='add-card-div'><button className='btn btn-primary' type='button' onClick={()=>navigate('/cardForm/')}>Add card</button></div>}
                    <div className='row'>
                      {user && isActive ? followers.map((elm,index)=>(
                        <Card
                          key={index}
                          vacation={elm}
                          following={isFollowing(elm.id)}
                          type={typeOfUser}
                          handleFollow={handleFollow}
                        />  
                      )):vacation.map((elm, index) => (
                          <Card
                          key={index}
                          vacation={elm}
                          following={isFollowing(elm.id)}
                          handleFollow={handleFollow}
                          handleDelete={handleDelete}
                          type={typeOfUser}
                          index={index}
                      />  
                      ))}
                    </div>
                </div>
            </div>
            {user && !isActive && (
              <div className="pagination">
                <Pagination totalPages={totalPages} pageNumber={pageNumber} setPageNumber={setPageNumber} isActive={isActive} />
              </div>
            )}
        </div>
  );
}

export default Vacation;
