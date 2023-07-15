import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} buttonText={"Сохранить"} isOpen={props.isOpen} title="Редактировать профиль" name="edit-profile" onClose={props.onClose}>
      <input
        value={name ?? ""}
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="popup__input popup__input_value_name"
        id="name"
        name="name"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        required=""
      />
      <span className="popup__input-error speciality-input-error" />
      <input
        value={description ?? ""}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        className="popup__input popup__input_value_speciality"
        id="speciality"
        name="speciality"
        placeholder="Ваша профессия"
        minLength={2}
        maxLength={200}
        required=""
      />
      <span className="popup__input-error speciality-input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
