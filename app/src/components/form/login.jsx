import React from 'react';
import './forms.css';
import { Link, Outlet,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { UserAuth } from '../../context/AuthContext';
import axios from 'axios';

function Login() {

  const {signIn} = UserAuth()
  const navigate = useNavigate()

  const schema = yup.object({
    email: yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please insert correct email").required("Email is required"),
    password: yup.string().required("Password is required")
  }).required();
  
  const {register:login, handleSubmit,formState: { errors },setError } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
      try {
          await signIn(data.email,data.password)
          axios.post('http://localhost:3030/login', {
            email:data.email,
            password:data.password
          })
          .then(function (response) {
                localStorage.setItem('jwtToken', JSON.stringify(response));
                navigate(`/`)
          })
      } catch (error) {
          setError("email", {
            type: "server",
            message:"Email or Pasword incorrect"
          })
      }
  }

  return (
    <div className="wrapperForm">
      <div className="form-container">
        <div className="login form">
          <header>Login</header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <input type="text" placeholder="Enter your email" {...login("email")}/>
                <p>{errors.email?.message}</p>
            </div>
            <div className="form-group">
                <input type="password" placeholder="Enter your password" {...login("password")}/>
                <p>{errors.password?.message}</p>
            </div>
            <input type="submit" className="button" value="Login" />
          </form>
          <div className="signup">
            <span className="signup">
              Don't have an account? <label><Link to="/register">Signup</Link></label>
            </span>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Login;
