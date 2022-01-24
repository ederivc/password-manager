const url = process.env.REACT_APP_SERVER_URL;
// const url = "http://127.0.0.1:5000";

const RESOURCE_URLS = {
  FETCH_AUTH_USER: "/api/auth/fetchAuthUser",
  REGISTER_USER: "/api/auth/register",
  LOGIN_USER: "/api/auth/login",
  LOGOUT_USER: "/api/auth/logout",
  USER_ACCOUNT: "/api/users/account",
  UPDATE_USER: "/api/users/updateUser",
  RESET_PASSWORD: "/api/auth/resetPassword",
  FORGOT_PASSWORD: "/api/auth/forgotPassword",
  CREATE_PASSWORD: "/api/password/createPassword",
  FETCH_PASSWORD: "/api/password/getPasswords",
  UPDATE_PASSWORD: "/api/password/updatePassword",
  DELETE_PASSWORD: "/api/password/deletePassword",
  CREATE_CATEGORY: "/api/categories/createCategory",
  FETCH_CATEGORY: "/api/categories/getCategories",
  FETCH_CATEGORY_PASSWORDS: "/api/password/getCategoryPasswords",
};
class APIUsers {
  static async fetchAuthUser() {
    const res = await fetch(`${url}${RESOURCE_URLS.FETCH_AUTH_USER}`, {
      credentials: "include",
    });

    return res;
  }

  static async loginUser(data) {
    const res = await fetch(`${url}${RESOURCE_URLS.LOGIN_USER}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res;
  }

  static async registerUser(data) {
    const res = await fetch(`${url}${RESOURCE_URLS.REGISTER_USER}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res;
  }

  static async logoutUser() {
    const res = await fetch(`${url}${RESOURCE_URLS.LOGOUT_USER}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  }

  static async fetchUserInfo() {
    const res = await fetch(`${url}${RESOURCE_URLS.USER_ACCOUNT}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  }

  static async updateUser(data) {
    const res = await fetch(`${url}${RESOURCE_URLS.UPDATE_USER}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res;
  }

  static async forgotPassword(data) {
    const res = await fetch(`${url}${RESOURCE_URLS.FORGOT_PASSWORD}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res;
  }

  static async resetPassword(data) {
    const res = await fetch(`${url}${RESOURCE_URLS.RESET_PASSWORD}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res;
  }
}

class APIPasswords {
  static async createPassword(data) {
    const res = await fetch(`${url}${RESOURCE_URLS.CREATE_PASSWORD}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: data }),
    });

    return res;
  }

  static async fetchPasswords() {
    const res = await fetch(`${url}${RESOURCE_URLS.FETCH_PASSWORD}`, {
      credentials: "include",
    });

    return res;
  }

  static async fetchCategoryPasswords(data) {
    const res = await fetch(`${url}${RESOURCE_URLS.FETCH_CATEGORY_PASSWORDS}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryId: data }),
    });

    return res;
  }

  static async updatePasswords(data) {
    const res = await fetch(`${url}${RESOURCE_URLS.UPDATE_PASSWORD}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res;
  }

  static async deletePassword(data) {
    const res = await fetch(`${url}${RESOURCE_URLS.DELETE_PASSWORD}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: data }),
    });

    return res;
  }
}

class APICategory {
  static async createCategory(data) {
    const res = await fetch(`${url}${RESOURCE_URLS.CREATE_CATEGORY}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res;
  }

  static async fetchCategories() {
    const res = await fetch(`${url}${RESOURCE_URLS.FETCH_CATEGORY}`, {
      credentials: "include",
    });

    return res;
  }
}

export { APIUsers, APIPasswords, APICategory, url };
