import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  //   console.log(props);
  const avatarInput = useRef(null);

  useEffect(() => {
    if (avatarInput.current) {
      avatarInput.current.value = "";
    }
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  }

  return (
    <PopupWithForm buttonText="Сохранить" isOpen={props.isOpen} title="Обновить аватар" name="update-avatar" onClose={props.onClose} onSubmit={handleSubmit}>
      <input ref={avatarInput} type="text" className="popup__input popup__input_value_name" id="name" name="name" placeholder="Ссылка на картинку" required />
      <span className="popup__input-error speciality-input-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
