import React, { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { api } from "../utils/Api";
import Card from "./Card";
import LoaderSpinner from "./LoaderSpinner";
import Login from "./Login";
import Register from "./Register";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return props.isLoaderSpinner ? (
    <LoaderSpinner />
  ) : (
    <main>
      <section className="profile">
        <div className="profile__content">
          <button onClick={props.onEditAvatar} className="profile__avatar-button" type="button">
            <img src={currentUser.avatar} alt="Аватар профиля" className="profile__avatar" />
          </button>
          <div className="profile__info">
            <div className="profile__info-wrapper">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button onClick={props.onEditProfile} type="button" className="profile__edit-button" />
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button onClick={props.onAddPlace} type="button" className="profile__button" />
      </section>
      <section className="gallery">
        {props.cards.map((card) => (
          <Card key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} card={card} onCardDelete={props.onCardDelete} />
        ))}
      </section>
    </main>
  );
}

export default Main;
