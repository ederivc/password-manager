const url = "http://localhost:5000";

const RESOURCE_URLS = {
  FETCH_AUTH_USER: "/api/auth/fetchAuthUser",
  REGISTER_USER: "/api/auth/register",
  LOGIN_USER: "/api/auth/login",
  LOGOUT_USER: "/api/auth/logout",
  USER_ACCOUNT: "/api/users/account",
  UPDATE_USER: "/api/users/updateUser",
  CREATE_PASSWORD: "/api/password/createPassword",
  FETCH_PASSWORD: "/api/password/getPasswords",
  UPDATE_PASSWORD: "/api/password/updatePassword",
  CREATE_CATEGORY: "/api/categories/createCategory",
  FETCH_CATEGORY: "/api/categories/getCategories",
  // UPDATE_CATEGORY: "/api/categories/updateCategory",
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
}

class APICategory {
  static async createCategory(data) {
    const res = await fetch(`${url}${RESOURCE_URLS.CREATE_CATEGORY}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: data }),
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
