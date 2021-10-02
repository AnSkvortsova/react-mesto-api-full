class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResult(response) {
    if(response.ok) {
      return response.json();
    };
    return Promise.reject(`Ошибка: ${response.status}`);
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then(response => this._checkResult(response));
  };

  pushUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then(response => this._checkResult(response));
  };
  
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
    .then(response => this._checkResult(response));
  };

  pushNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(response => this._checkResult(response));
  };

  setLikeCard(id, isLike) {
    const status = isLike ? 'DELETE' : 'PUT'
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: status,
      headers: this._headers,
    })
    .then(response => this._checkResult(response));
  };

  removeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(response => this._checkResult(response));
  };

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(response => this._checkResult(response));
  }
}

const options = {
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
}
const api = new Api(options);
export default api;