import { useState, useEffect } from 'react'; 
import { Route, Switch, useHistory } from 'react-router-dom';
import { Footer } from './Footer'; 
import { Header } from './Header'; 
import { Main } from './Main'; 
import { EditProfilePopup } from './EditProfilePopup'; 
import { AddPlacePopup } from './AddPlacePopup'; 
import { EditAvatarPopup } from './EditAvatarPopup'; 
import { ImagePopup } from './ImagePopup'; 
import { ConfirmPopup } from './ConfirmPopup'; 
import api from '../utils/api'; 
import { CurrentUserContext } from '../contexts/CurrentUserContext'; 
import { Register } from './Register';
import { Login } from './Login';
import { ProtectedRoute } from './ProtectedRoute'; 
import { InfoTooltip } from './InfoTooltip';
import * as auth from '../utils/auth';
 
function App() { 
  const history = useHistory();

  // попапы 
  const [isEditProfilePopupOpen, setEditProfileState] = useState(false); 
  const [isAddPlacePopupOpen, setAddPlaceState] = useState(false); 
  const [isEditAvatarPopupOpen, setEditAvatarState] = useState(false); 
  const [selectedCard, setSelectedCard] = useState(null); 
  const [removedCard, setRemovedCard] = useState(null); 
  const [isInfoTooltipOpen, setInfoTooltipState] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState(false);
 
  // пользователь и карточки 
  const [currentUser, setCurrentUserState] = useState({}); 
  const [userEmail, setUserEmail] = useState('');
  const [cards, setCardsState] = useState([]); 

  // регистрация
  const [loggedIn, setLoggedInState] = useState(false);
 
  // открытие и закрытие попапов 
  function handleEditProfileClick() { 
    setEditProfileState(true); 
  }; 
  function handleAddPlaceClick() { 
    setAddPlaceState(true); 
  }; 
  function handleEditAvatarClick() { 
    setEditAvatarState(true); 
  }; 
  function handleCardClick(card) { 
    setSelectedCard(card); 
  }; 
  function handleDeleteClick(card) { 
    setRemovedCard(card); 
  }; 
 
  function closeAllPopups() { 
    setEditProfileState(false); 
    setAddPlaceState(false); 
    setEditAvatarState(false); 
    setSelectedCard(null); 
    setRemovedCard(null); 
    setInfoTooltipState(false);
  }; 
   
  // обработчик Escape и overlay
  useEffect(() => {
    const closeByEscape = (evt) => {
      if(evt.key === 'Escape') {
        closeAllPopups();
      };
    };
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  useEffect(() => {
    const closeByOverlay = (evt) => {
      if(evt.target.classList.contains('popup_opend')) {
        closeAllPopups();
      };
    };
    document.addEventListener('click', closeByOverlay);
    return () => document.removeEventListener('click', closeByOverlay);
  }, []);
 
  useEffect(() => { 
    Promise.all([ 
      api.getUserInfo(), 
      api.getInitialCards(), 
    ]) 
    .then(([userData, cardData]) => { 
      setCurrentUserState(userData); 
      setCardsState(cardData); 
    }) 
    .catch((err) => { 
      console.log(err) 
    }) 
  }, []); 
 
  // пользователь 
  function handleUpdateUser (data) { 
    api.pushUserInfo(data) 
    .then((result) => { 
      setCurrentUserState(result); 
      closeAllPopups(); 
    }) 
    .catch((err) => { 
      console.log(err) 
    }) 
  }; 
 
  function handleUpdateAvatar(data) { 
    api.updateAvatar(data) 
    .then((result) => { 
      setCurrentUserState(result); 
      closeAllPopups(); 
    }) 
    .catch((err) => { 
      console.log(err) 
    }) 
  }; 
 
  // карточки 
  function handleAddPlaceSubmit(data) { 
    api.pushNewCard(data) 
    .then((newCard) => { 
      setCardsState([newCard, ...cards]); 
      closeAllPopups(); 
    }) 
    .catch((err) => { 
      console.log(err) 
    }) 
  }; 
 
  function handleCardLike(card) { 
    const isLiked = card.likes.some(i => i._id === currentUser._id); 
    api.setLikeCard(card._id, isLiked) 
    .then((newCard) => { 
      setCardsState((state) => state.map((c) => c._id === card._id ? newCard : c)); 
    }) 
    .catch((err) => { 
      console.log(err) 
    }); 
  }; 
 
  function handleCardDelete(card) { 
    api.removeCard(card._id) 
    .then(() => { 
      setCardsState((state) => state.filter(item => item._id !== card._id)); 
      closeAllPopups(); 
    }) 
    .catch((err) => { 
      console.log(err) 
    }); 
  }; 

  // подтверждение регистрации
  function handleRegisterSubmit(password, email) {
    auth.register(password, email)
    .then((data) => {
      setInfoTooltipState(true);
      if(data) {
        setInfoTooltip(true);
        history.push('/sign-in');
      } else {
        setInfoTooltip(false);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  };

  // вход 
  function handleLoginSubmit(password, email) {
    setUserEmail(email);
    auth.authorize(password, email)
    .then((data) => {
      if(data.token) {
        setLoggedInState(true);
        localStorage.setItem('jwt', data.token);
        history.push('/');
      }
    })
    .catch((err) => {
      console.log(err);
    })
  };

  // проверка токена
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      auth.getContent(jwt)
      .then((res) => {
        if(res) {
          setLoggedInState(true);
          setUserEmail(res.data.email);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [loggedIn, history]);

  //выход
  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedInState(false);
    setUserEmail('');
    history.push('/sign-in');
  }

 
  return ( 
    <CurrentUserContext.Provider value={currentUser}> 
    <div className="page"> 
      <Header 
      userEmail={userEmail}
      onLogout={handleLogout} /> 

      <Switch>
        <Route path="/sign-up">
          <Register 
          onRegisterSubmit = {handleRegisterSubmit}
          />
        </Route>

        <Route path="/sign-in">
          <Login
          onLoginSubmit = {handleLoginSubmit} />
        </Route>

        <ProtectedRoute
          isLoggedIn = {loggedIn} path = "/" render = {() => {
            return <Main  
            onEditProfile = {handleEditProfileClick}  
            onAddPlace = {handleAddPlaceClick} 
            onEditAvatar = {handleEditAvatarClick} 
            cards = {cards} 
            onCardClick = {handleCardClick} 
            onCardLike = {handleCardLike} 
            onDeleteClick = {handleDeleteClick} 
            onCardDelete = {handleCardDelete} />;
          }} />
      </Switch>
 
      <Footer /> 
 
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} /> 
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 
      <ImagePopup card={!!selectedCard && selectedCard} onClose={closeAllPopups} /> 
      <ConfirmPopup isOpen={removedCard} onClose={closeAllPopups} onCardDelete={handleCardDelete} /> 
      <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isInfoTooltip={infoTooltip} />
    </div> 
    </CurrentUserContext.Provider> 
  ); 
} 
 
export default App;