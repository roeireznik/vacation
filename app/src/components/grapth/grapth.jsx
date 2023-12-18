import React, { useEffect, useState } from "react";
import NavBar from "../navbar/navbar";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './grapth.css'
import { UserAuth } from "../../context/AuthContext";
import axios from "axios";


function Grapth() {
  const [isActive, setIsActive] = useState(false);
  const [followers,setfollowers] = useState([])
  const {user, logout} = UserAuth()


  const getData = async () => {
    if(user){
        const jwtToken = JSON.parse(localStorage.getItem('jwtToken'));
        const {data} = await axios.get(`http://localhost:3030/?all=getallfollowers`,{
          headers:{
            'Authorization': jwtToken.data.token,
          }
        });
        if(data.message === "jwt expired"){
          logout()
        }else{
            setfollowers(data[0])
        }
    }
  }

  useEffect(()=>{
    getData();
  },[])

  console.log(followers)


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    maintainAspectRatio : false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Vacations total followers',
      },
    },
  };

  const labels = followers.map((elm,index)=> elm.destination)

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: followers.map((elm,index)=> elm.followers),
        backgroundColor: 'rgb(0, 84, 255,0.5)',
      }
    ],
  };

  return ( 
      <div id="background">
          <NavBar isActive={isActive} setIsActive={setIsActive}/>
          <div id="grapth">
              <Bar options={options} data={data} />
          </div>
          
      </div>
   );
}

export default Grapth;










