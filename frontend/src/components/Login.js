import React, { useState } from 'react';

export function Login(props) {
  const [login, setLoginState] = useState({
    email: '',
    password: '',
  });

  const { email, password } = login;

  function handleInputChange(evt) {
    const {name, value} = evt.target;
    setLoginState({...login, [name]: value});
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLoginSubmit(password, email);
    setLoginState({
      email: '',
      password: '',
    });
  };

  return( 
    <div className="auth"> 
      <h2 className="auth__title">Вход</h2>
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
        <button className="auth__button" type="submit" aria-label="Зарегистрироваться">Войти</button>
      </form>
    </div> 
  );
}