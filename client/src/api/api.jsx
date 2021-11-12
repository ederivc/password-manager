const url = "http://localhost:5000";

const RESOURCE_URLS = {
  FETCH_AUTH_USER: "/api/auth/fetchAuthUser",
  REGISTER_USER: "/api/auth/register",
  LOGIN_USER: "/api/auth/login",
  LOGOUT_USER: "/api/auth/logout",
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
}

export { APIUsers, url };
