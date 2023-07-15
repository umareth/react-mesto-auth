import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `gallery__like-button ${isLiked && "gallery__like-button_active"}`;

  function handleClick() {
    props.onCardClick(props.card.name, props.card.link);
  }

  function handleLikeClick() {
    props.onCardLike(props.card, currentUser);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card._id);
  }

  return (
    <div className="gallery__items">
      {isOwn && <button className="gallery__delete-button" onClick={handleDeleteClick} />}
      <img onClick={handleClick} alt={props.card.name} className="gallery__image" src={props.card.link} />
      <div className="gallery__bottom">
        <h2 className="gallery__title">{props.card.name}</h2>
        <div className="gallery__like-container">
          <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName} />
          <span className="gallery__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
