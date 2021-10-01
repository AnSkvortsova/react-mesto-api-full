import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Register(props) {
  const [register, setRegisterState] = useState({
    email: '',
    password: '',
  });

  const { email, password } = register;

  function handleInputChange(evt) {
    const {name, value} = evt.target;
    setRegisterState({...register, [name]: value});
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegisterSubmit(password, email);
    setRegisterState({
      email: '',
      password: '',
    })
  };

  return( 
    <div className="auth"> 
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__inputs-container">

        <input className="auth__input" type="text" 
        name="email" 
        value={email || ''} 
        onChange={handleInputChange}
        placeholder="Email"></input>

        <input className="auth__input" type="text" 
        name="password" 
        value={password || ''} 
        onChange={handleInputChange}
        placeholder="Пароль"></input>

        </div>
        <button className="auth__button" type="submit" aria-label="Зарегистрироваться">Зарегистрироваться</button>
      </form>
      <div className="auth__link-container">
        <Link to="/sign-in" className="auth__link">Уже зарегистрированы? Войти</Link>
      </div>
    </div> 
  ); 
}