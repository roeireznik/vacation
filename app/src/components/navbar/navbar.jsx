import React from "react";
import './navbar.css'
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

function NavBar({isActive,setIsActive}) {
  
  const location = useLocation();
  const isHomeActive = location.pathname === '/';
  const isGraphActive = location.pathname === '/grapth';
  
  const {user, logout,typeOfUser, first, last} = UserAuth()

  const navigate = useNavigate()

  const handleLogout = async () => {
      try {
          await logout()
          navigate('/login')
          console.log('you are looged out')
      } catch (e) {
          console.log(e.message)
      }
  }



  return (
    <>
      <div className="topnav" id="myTopnav">  
        <ul>
            <li onClick={()=>setIsActive(false)}  className={isHomeActive && !isActive ? "active" : "" }><Link to="/" >Home</Link></li>
            {isHomeActive && typeOfUser ==="user" &&
              <li className={isActive ? "active" : ""}><a href="#" onClick={()=>setIsActive(true)}>myVacations</a></li>
            }
            <li className={isGraphActive ? "active" : ""}><Link to="/grapth" >Graph</Link></li>
        </ul>
        <div>
          <span>Hello {user && `${first} ${last}`}</span>
          <span><button onClick={handleLogout}  type="button" className="btn btn-light">Logout</button></span>
        </div>        
      </div>
      <Outlet />
    </>
  );
}

export default NavBar;