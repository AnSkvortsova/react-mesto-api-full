export function renderLoading (popupSelector, isLoading) {
  const popupElement = document.querySelector(popupSelector);
  const buttonSubmit = popupElement.querySelector('.popup__submit');
  if(isLoading) {
    buttonSubmit.textContent = 'Сохранение...';
  } else {
    buttonSubmit.textContent = 'Сохранить';
  }
}