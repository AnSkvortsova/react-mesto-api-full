import React, { useState, useEffect } from "react"; 
import { PopupWithForm } from "./PopupWithForm"; 
import { CurrentUserContext } from '../contexts/CurrentUserContext'; 
 
export function EditProfilePopup(props) { 
  const currentUser = React.useContext(CurrentUserContext); 
 
  const [userName, setUserName] = useState(''); 
  const [userDescription, setUserDescription] = useState(''); 
 
  useEffect(() => { 
    setUserName(currentUser.name); 
    setUserDescription(currentUser.about); 
  }, [currentUser, props.isOpen]); 
 
  function handleChangeName(evt) { 
    setUserName(evt.target.value) 
  }; 
  function handleChangeDescription(evt) { 
    setUserDescription(evt.target.value) 
  }; 
  function handleSubmit(evt) { 
    evt.preventDefault(); 
    props.onUpdateUser({ 
      name: userName, 
      about: userDescription, 
    }) 
  }; 
 
  return( 
    <PopupWithForm name="edit" title="Редактировать профиль" button="Сохранить"  
    isOpen={props.isOpen}  
    onClose={props.onClose} 
    onSubmit={handleSubmit} > 
 
      <input className="popup__input" minLength="2" maxLength="40" id="input-name" name="userName" type="text"  
      value={userName || ''}  
      onChange={handleChangeName}  
      required /> 
      <span className="popup__input-error" id="input-name-error"></span> 
       
      <input className="popup__input" minLength="2" maxLength="200" id="input-job" name="userJob" type="text"  
      value={userDescription || ''}  
      onChange={handleChangeDescription}  
      required /> 
      <span className="popup__input-error" id="input-job-error"></span> 
    </PopupWithForm> 
  );  
} 