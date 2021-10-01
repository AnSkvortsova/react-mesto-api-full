import { PopupWithForm } from "./PopupWithForm";
export function ConfirmPopup(props) {

  function handleConfirm(evt) {
    evt.preventDefault();
    props.onCardDelete(props.isOpen);
  };

  return(
    <PopupWithForm name="delete" title="Вы уверены?" button="Да" 
    isOpen={props.isOpen} 
    onClose={props.onClose}
    onSubmit={handleConfirm} >
    </PopupWithForm>
  );
}