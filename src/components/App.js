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

function App() {
  const [isLoaderSpinner, setLoaderSpinner] = useState(true);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

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
    // console.log("click");
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
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          isLoaderSpinner={isLoaderSpinner}
          setCards={setCards}
          cards={cards}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          onCardClick={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
        />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
