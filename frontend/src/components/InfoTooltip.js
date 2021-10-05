export function InfoTooltip(props) {
  return(
    <div className={`popup popup_type_register ${props.isOpen ? 'popup_opend' : ''}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" aria-label="закрыть" onClick={props.onClose}></button>
        <div className={`popup__register ${props.isInfoTooltip ? 'popup__register_done' : 'popup__register_error'}`}></div>
        <h2 className="popup__title popup__title_register">
          {props.isInfoTooltip ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  )
}