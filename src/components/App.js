import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Routes, Navigate, useNavigate, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedComponent from "./ProtectedComponent";
import auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";
import Error404 from "./Error404.jsx";

function App() {
  const [isLoaderSpinner, setLoaderSpinner] = useState(true);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((res) => {
        setCards(res);
        setLoaderSpinner(false);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    handleJwtCheck();
  }, [loggedIn]);

  const handleCardLike = async (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    try {
      const newCard = await api.toggleLike(card._id, isLiked);
      setCards(cards.map((item) => (item._id === card._id ? newCard : item)));
    } catch (error) {
      console.log(`Ошибка при клике на лайк: ${error}`);
    }
  };

  async function handleCardDelete(cardId) {
    try {
      await api.removeCard(cardId);
      const newCards = cards.filter((card) => card._id !== cardId);
      setCards(newCards);
    } catch (error) {
      console.log(`Ошибка при удалении карточки: ${error}`);
    }
  }

  function handleUpdateUser(InputValue) {
    api
      .setUserInfo(InputValue)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка при изменении данных профиля: ${error}`);
      });
  }

  async function handleAddPlaceSubmit(data) {
    try {
      const newCard = await api.addCard(data);
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (error) {
      console.log(`Ошибка при добавлении карточки: ${error}`);
    }
  }

  function handleUpdateAvatar(data) {
    api
      .setAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка при загрузки аватара: ${error}`);
      });
  }

  async function handleLoginSubmit(data) {
    try {
      const res = await auth.login(data);
      localStorage.setItem("jwt", res.token);
      setLoggedIn(true);
      setEmail(data.email);
      navigate("/", { replace: true });
    } catch (error) {
      setIsResultPopupOpen(true);
      setIsSuccess(false);
      console.log(`Ошибка при авторизации: ${error}`);
    }
  }

  function handleRegistSubmit(InputValue) {
    console.log(InputValue);
    auth
      .register(InputValue)
      .then(() => {
        setIsResultPopupOpen(true);
        setIsSuccess(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((error) => {
        setIsResultPopupOpen(true);
        setIsSuccess(false);
        console.log(`Ошибка при регистрации: ${error}`);
      });
  }

  async function handleJwtCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      try {
        const res = await auth.checkToken(jwt);
        setLoggedIn(true);
        setEmail(res.data.email);
        navigate("/");
      } catch (error) {
        console.error("Ошибка при проверке токена:", error);
        // В случае ошибки, сбросить авторизацию пользователя
        setLoggedIn(false);
      }
    } else {
      // Если токен отсутствует, сбросить авторизацию пользователя
      setLoggedIn(false);
    }
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
  }

  function handleCardClick(name, link) {
    setSelectedCard({ name, link });
  }
  // Обработчики событий
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsResultPopupOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                isLoaderSpinner={isLoaderSpinner}
                setCards={setCards}
                cards={cards}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                onCardClick={handleCardClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                element={ProtectedComponent}
                loggedIn={loggedIn}
                email={email}
                handleLogOut={handleLogOut}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header name="register" />
                <Main name="register" handleSignup={handleRegistSubmit} />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header name="login" />
                <Main name="login" handleSignin={handleLoginSubmit} />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <Header name="register" />
                <Error404 />
              </>
            }
          />
        </Routes>
        <Footer />
        <InfoTooltip
          name="result"
          successMessage="Вы успешно зарегистрировались"
          failureMessage="Что-то пошло не так! Попробуйте еще раз."
          isSuccess={isSuccess}
          isOpen={isResultPopupOpen}
          onClose={closeAllPopups}
        />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
