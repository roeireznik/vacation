import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import NavBar from "../navbar/navbar";
import axios from "axios";

function CardForm() {
    const [isActive, setIsActive] = useState(false);
    const schema = yup.object({
      destination: yup.string().max(50).required("Destination is required"),
      description: yup.string().max(300).required("description is required"),
      picture: yup.string().matches(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,'Must contain valid Url').required('Url is required'),
      start:yup.date().required('Starting date is required'),
      end:yup.date().required('Ending date is required'),
      price: yup.number().required('Price is required'),
    }).required();

    const { register:card, handleSubmit,formState: { errors },setError, setValue} = useForm({
      resolver: yupResolver(schema)
    });
  
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const vacation = JSON.parse(queryParams.get('vacation'));
    const navigate = useNavigate()

  useEffect(() => {
    if(vacation){
        setValue('destination', vacation.destination);
        setValue('description', vacation.description);
        setValue('picture', vacation.picture);
    
        // Format the date values as strings with time
        setValue('start', formatDateTime(new Date(vacation.start)));
        setValue('end', formatDateTime(new Date(vacation.end)));
    
        setValue('price', vacation.price);
    }

  }, [setValue, vacation]);

  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const onSubmit = async (data) => {
    let action;

    if(vacation){
        action = 'edit'
    }else{
        action = 'add'
    }

    const jwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const config = {
      headers: {
        'Authorization': jwtToken.data.token,
      },
    };
    try {
      let response;
      switch (action) {
        case 'add':
          response = await axios.post('http://localhost:3030/add', data, config);
          if(response.data.action === "added"){
            navigate('/')
          }
        break;
        case 'edit':
          response = await axios.put('http://localhost:3030/edit', [data,vacation.id], config);
          if(response.data.action === "edited"){
              navigate('/')
          }
        break;
        default:
          console.log('Unknown action type')
        break;
      }

      if (response && response.data) {
        // Handle success
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="card-color" className="wrapperForm">
      <NavBar isActive={isActive} setIsActive={setIsActive}/>
      <div className="form-container form-container-card">
        <div className="registration form">      
            {vacation ? (
                <header>Edit: {vacation.destination}</header>
            ) : (
                <header>Add new Vacation</header>
            )}    
            <form id="card-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label><b>Destination:</b>
                        <input  type="text" placeholder="Destination" {...card("destination")}/>
                    </label>
                    <p>{errors.destination?.message}</p>
                </div>
                <div className="form-group">
                  <label><b>Description:</b>
                      <input type="text" placeholder="Description" {...card("description")}/>
                  </label>
                      <p>{errors.description?.message}</p>
                </div>
                <div className="form-group">
                    <label>Picture:
                        <input type="text" placeholder="Picture" {...card("picture")}/>
                    </label>
                    <p>{errors.picture?.message}</p>
                </div>
                <div className="form-group">
                  <label><b>Start:</b>
                      <input type="datetime-local" placeholder="Start" {...card("start")}/>            
                  </label>
                  <p>{errors.start?.message}</p>
                </div>
                <div className="form-group">
                    <label><b>End:</b>
                        <input type="datetime-local" placeholder="End" {...card("end")}/>
                    </label>
                    <p>{errors.end?.message}</p>
                </div>
                <div className="form-group">
                    <label><b>Price:</b>
                        <input type="number" placeholder="Price" {...card("price")}/>
                    </label>
                    <p>{errors.price?.message}</p>
                </div>
              <input type="text" className="button action-card-save" defaultValue="Cancel" onClick={()=>navigate('/')}/>
              <input type="submit" className="button action-card-save" defaultValue="Save" />
          </form>
        </div>
      </div>
      <Outlet />
    </div> 
  );
}

export default CardForm;