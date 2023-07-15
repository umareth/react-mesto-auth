import React from "react";

function PopupWithForm(props) {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form onSubmit={props.onSubmit} className={`popup__form popup__form_type_${props.name}`} name={props.name} noValidate="">
          <div className="popup__input-wrapper">{props.children}</div>
          <button type="submit" className={`popup__button form__submit_type_${props.name}`}>
            {props.buttonText}
          </button>
        </form>
        <button type="button" className="popup__close-btn" onClick={handleClose} />
      </div>
    </div>
  );
}

export default PopupWithForm;
