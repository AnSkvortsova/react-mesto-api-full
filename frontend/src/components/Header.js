import { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import logoPath from '../images/logo.svg';

export function Header(props) {
  const [isOpen, setOpenState] = useState(false);
  function heandleMenuButton() {
    setOpenState(true);
  };

  function heandleCloseButton() {
    setOpenState(false);
  };

  return(
    <header className="header page__section">
      <div className="header__line"></div>
      <img className="logo" src={logoPath} alt="логотип" />
      <Switch>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>

        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </Route>

        <Route path="/">
          <>
            <button className={`header__menu ${isOpen ? 'header__menu_hidden' : ''}`} type="button" aria-label="меню" onClick={heandleMenuButton}></button>
            <button className={`header__menu-close ${!isOpen ? 'header__menu-close_hidden' : ''}`} type="button" aria-label="закрыть меню" onClick={heandleCloseButton}></button>
            <div className={`header__container ${isOpen ? 'header__container_mobile' : ''}`}>
              <p className="header__email">{props.userEmail}</p>
              <Link to="/sign-in" className="header__link-out" onClick={props.onLogout} >Выйти</Link>
            </div>
          </>
        </Route>
      </Switch>
    </header>
  );
}