export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = `${baseUrl}`;
    this._headers = headers;
    this._token = headers.authorization;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  setUserInfo(InputValue) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: InputValue.name,
        about: InputValue.about,
      }),
    }).then(this._getResponseData);
  }

  addCard(InputValue) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: InputValue.name,
        link: InputValue.link,
      }),
    }).then(this._getResponseData);
  }

  toggleLike(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  setAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar,
      }),
    }).then(this._getResponseData);
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "2e9ea00f-a4b6-41b7-9927-84e2f267cb21",
    "Content-Type": "application/json",
  },
});
