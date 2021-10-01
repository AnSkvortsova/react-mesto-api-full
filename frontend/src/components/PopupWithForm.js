export function PopupWithForm(props) { 
 
  return( 
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opend' : ''}`}> 
        <div className="popup__container" id={`popup__${props.name}-container`}> 
          <button className="popup__close" id={`popup__${props.name}-close`} type="button" aria-label="закрыть" onClick={props.onClose}></button> 
          <h2 className="popup__title">{props.title}</h2> 
          <form className="popup__form" name={props.name} onSubmit={props.onSubmit} > 
            { props.children } 
            <button className="popup__submit" id={`popup__submit-${props.name}`} type="submit" aria-label="сохранить">{props.button}</button> 
          </form> 
        </div> 
    </div> 
  ); 
} 