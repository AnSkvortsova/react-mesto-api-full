import React, { useState } from "react";
import { PopupWithForm } from "./PopupWithForm";

export function AddPlacePopup(props) {
  const [place, setPlace] = useState('');
  const [link, setLink] = useState('');

  function handleChangePlace(evt) {
    setPlace(evt.target.value);
  };

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: place,
      link,
    });
    setPlace('');
    setLink('');
  };

  return(
    <PopupWithForm name="add" title="Новое место" button="Добавить" 
    isOpen={props.isOpen} 
    onClose={props.onClose}
    onSubmit={handleSubmit} >
      
      <input className="popup__input" minLength="2" maxLength="30" id="input-place" name="name" type="text" placeholder="Название" 
      value={place} 
      onChange={handleChangePlace} 
      required />
      <span className="popup__input-error" id="input-place-error"></span>

      <input className="popup__input" id="input-link" name="link" type="url" placeholder="Ссылка на картинку" 
      value={link}  
      onChange={handleChangeLink} 
      required />
      <span className="popup__input-error" id="input-link-error"></span>
    </PopupWithForm>
  );
}