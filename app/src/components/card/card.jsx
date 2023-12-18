import React from "react";
import './card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";

function Card(props) {
  const { vacation, following, handleFollow, type,handleDelete,index} = props;
  
  const startStr = new Date(vacation.start)
  const endStr = new Date(vacation.end)

  const navigate = useNavigate()


  return ( 
        <div className="col-12 col-sm-6 col-lg-4 col-xl-4 mb-5">
            <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{vacation.destination}</h5>
                  <p className="card-text">{vacation.description}</p>
                </div>
                {type === 'user' ? (
                    <button className={` f-icon ${following ? 'follow': ''}`} onClick={() =>  handleFollow(vacation.id)}>
                      <FontAwesomeIcon icon={['fab', 'fa-facebook-f']} />
                    </button>
                ):type === 'admin' ? (
                    <div className="edit-delete">    
                        <a id="delete" onClick={ () => {if(window.confirm('Are you sure?')) { handleDelete(vacation.id, index)} }}>
                          <FontAwesomeIcon icon={'fa-trash'} style={{ color: 'blue',cursor:'pointer' }} size="xl"/>
                        </a>
                        <a id="edit" onClick={ () => navigate(`/cardForm/?vacation=${JSON.stringify(vacation)}&index=${index}`)}><FontAwesomeIcon icon={'fa-pencil'} style={{ color: 'red',cursor:'pointer' }} size="xl"/></a>
                    </div>
                ):null }
                <img className="card-img-top" src={vacation.picture} alt="Card img cap" />
                <div className="timeprice">
                    <span>
                        {startStr.getFullYear()}/{('0' + ( startStr.getMonth() + 1)).slice(-2)}/{('0' + startStr.getDate()).slice(-2)} - {endStr.getFullYear()}/{('0' +( endStr.getMonth() + 1)).slice(-2)}/{('0' + endStr.getDate()).slice(-2)}</span>
                    <span>{vacation.price}$</span>
                </div>
                <span className="followers">followers: {vacation.followers}</span>
            </div>
        </div>
   );
}

export default Card;

