import React, { useRef } from "react";
import { PopupWithForm } from "./PopupWithForm";

export function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  return(
    <PopupWithForm name="avatar" title="Обновить аватар" button="Сохранить" 
    isOpen={props.isOpen} 
    onClose={props.onClose}
    onSubmit={handleSubmit} >
      <input className="popup__input" id="input-avatar" name="avatar" type="url" placeholder="Ссылка" ref={avatarRef} required />
      <span className="popup__input-error" id="input-avatar-error"></span>
    </PopupWithForm>
  );
}