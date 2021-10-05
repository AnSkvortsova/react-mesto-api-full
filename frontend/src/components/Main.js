import React from 'react';
import pencilPath from '../images/pencil.svg';
import { Card } from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Main(props) {
  
  const currentUser = React.useContext(CurrentUserContext);


  return(
    <main className="main">
      <section className="profile page__section">
        <div className="profile__box">
          <div className="profile__avatar" onClick={props.onEditAvatar}>
            <img className="profile__image" alt="Аватар" src={currentUser.avatar} />
            <img className="profile__pencil" src={pencilPath} alt="Карандаш" />
          </div>
        <div className="profile__info">
          <div className="profile__row">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="редактировать" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="добавить" onClick={props.onAddPlace}></button>
        </div>
      </section>

      <section className="elements page__section">
        {props.cards.map((card) => (
            <Card 
            key={card._id}
            card={card} 
            onCardClick={props.onCardClick} 
            onDeleteClick={props.onDeleteClick} 
            onCardLike={props.onCardLike} 
            onCardDelete={props.onCardDelete} />
        ))}
      </section>

    </main>
  );
}