export function ImagePopup(props) {
  
  return(
    <div className={`popup popup_type_image ${props.card ? 'popup_opend' : ''}`} >
        <div className="popup__img-container">
          <button className="popup__close" id="popup__img-close" type="button" aria-label="закрыть" onClick={props.onClose}></button>
          <figure className="popup__figure">
            <img className="popup__image-big" src={props.card.link}  alt={props.card.name} />
            <figcaption className="popup__text">{props.card.name}</figcaption>
          </figure>
        </div>
      </div>
  );
}