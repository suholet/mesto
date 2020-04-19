class Api {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => this.parseResponse(res))
      .catch((err) => {
        throw err;
      });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => this.parseResponse(res))
      .catch((err) => {
        throw err;
      });
  }

  updateProfileInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => this.parseResponse(res))
      .catch((err) => {
        throw err;
      });
  }

  addNewCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => this.parseResponse(res))
      .catch((err) => {
        throw err;
      });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => this.parseResponse(res))
      .catch((err) => {
        throw err;
      });
  }

  likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/like/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => this.parseResponse(res))
      .catch((err) => {
        throw err;
      });
  }

  dislikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/like/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => this.parseResponse(res))
      .catch(() => {
        throw err;
      });
  }

  // test avatar https://images.unsplash.com/photo-1551772610-7a49996cd2c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=640
  updateAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then((res) => this.parseResponse(res))
      .catch((err) => {
        throw err;
      });
  }
}

export default Api;
