import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`element__trash ${isOwn ? '' : 'element__trash_hidden'}`);

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__heart ${isLiked ? 'element__heart_active' : ''}`);

  function handleClick() {
    props.onCardClick(props.card);
  };

  function handleLikeClick() {
    props.onCardLike(props.card);
  };

  function handletDeleteClick() {
    props.onDeleteClick(props.card);
  }
  
  return(
    <article className="element">
      <img className="element__image" src={props.card.link}   alt={props.card.name} onClick={handleClick} />
      <button className={cardDeleteButtonClassName} type="button" aria-label="удалить" onClick={handletDeleteClick} ></button>
      <div className="element__bottom">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__likes">
          <button className={cardLikeButtonClassName} type="button" aria-label="отметить как нравиться" onClick={handleLikeClick}></button>
          <p className="element__number">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}