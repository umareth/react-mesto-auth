import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup__banner" ${props.card ? "popup_opened" : " "}`}>
      <div className="popup__image-wrap">
        <button type="button" className="popup__close-btn" onClick={props.onClose} />
        <img src={props.card ? props.card.link : " "} alt={props.card ? props.card.name : " "} className="popup__image" />
        <figcaption className="popup__caption">{props.card ? props.card.name : " "}</figcaption>
      </div>
    </div>
  );
}

export default ImagePopup;
