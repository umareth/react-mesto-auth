import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  //   console.log(props);
  const [name, setName] = React.useState(null);
  const [link, setLink] = React.useState(null);

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ name, link });
  }

  return (
    <PopupWithForm buttonText={"Создать"} onSubmit={handleSubmit} isOpen={props.isOpen} title="Новое место" name="add-place" onClose={props.onClose}>
      <input
        value={name ?? ""}
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="popup__input popup__input_value_name"
        id="name"
        name="name"
        placeholder="Название"
        minLength={2}
        maxLength={40}
        required=""
      />
      <span className="popup__input-error speciality-input-error" />
      <input
        value={link ?? ""}
        onChange={(e) => setLink(e.target.value)}
        type="text"
        className="popup__input popup__input_value_speciality"
        id="speciality"
        name="speciality"
        placeholder="Ссылка на картинку"
        minLength={2}
        maxLength={200}
        required=""
      />
      <span className="popup__input-error speciality-input-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
