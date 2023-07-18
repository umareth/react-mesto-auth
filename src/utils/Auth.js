class Auth {
  constructor(res) {
    this._url = res.baseUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  register(data) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    }).then((res) => this._getResponseData(res));
  }

  login(data) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    }).then((res) => this._getResponseData(res));
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }
}

const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
});

export default auth;
