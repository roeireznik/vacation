import React from 'react';
import './forms.css';
import { Link, Outlet, useNavigate   } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { UserAuth } from '../../context/AuthContext';

const schema = yup.object({
  first: yup.string().required("First Name is required"),
  last: yup.string().required("Last Name is required"),
  email: yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please insert correct email").required("Email is required"),
  password: yup.string().min(6,'Minimum 6 characters').required("Password is required"),
  confirm:yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match')
}).required();

function Register() {
  const { register, handleSubmit,formState: { errors },setError } = useForm({
    resolver: yupResolver(schema)
  });

  const {createUser} = UserAuth()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await createUser(data.email, data.password)
      axios.post('http://localhost:3030/register', {
        firstName: data.first,
        lastName: data.last,
        email:data.email,
        password:data.password
      })
      .then(function (response) {
          if(response.data.status === "Email already exist"){
            setError("email", {
                type: "server",
                message:"Email already exist"
            })
          }else{
             navigate('/login')
          }
      })
    } catch (error) {
      
    }
  }

  return (
    <div className="wrapperForm">
        <div className="form-container">
          <div className="registration form">
            <header>Signup</header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                  <input  type="text" placeholder="First Name" {...register("first")}/>
                  <p>{errors.first?.message}</p>
              </div>
              <div className="form-group">
                  <input type="text" placeholder="Last Name" {...register("last")}/>
                  <p>{errors.last?.message}</p>
              </div>
              <div className="form-group">
                  <input type="text" placeholder="Enter your email" {...register("email")}/>
                  <p>{errors.email?.message}</p>
              </div>
              <div className="form-group">
                  <input type="password" placeholder="Create a password" {...register("password")}/>
                  <p>{errors.password?.message}</p>
              </div>
              <div className="form-group">
                  <input type="password" placeholder="Confirm your password" {...register("confirm")}/>
                  <p>{errors.confirm?.message}</p>
              </div>
              <input type="submit" className="button" value="Signup" />
            </form>
            <div className="signup">
              <span className="signup">
                Already have an account? <label htmlFor="check"><Link to="/login">Login</Link></label>
              </span>
            </div>
          </div>
        </div>
        <Outlet />
    </div>
  );
}

export default Register;
