import { defineStore } from "pinia";
import { client } from "../config/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("auth_user")) || null,
    token: localStorage.getItem("access_token") || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(credentials) {
      try {
        const response = await client.post("/api/login", credentials);

        if (!response.data || !response.data.data) {
          throw new Error("Invalid response format from server");
        }

        const { user, access_token } = response.data.data;

        if (!user || !access_token) {
          throw new Error("Missing user or access token in response");
        }

        this.user = user;
        this.token = access_token;

        localStorage.setItem("access_token", this.token);
        localStorage.setItem("auth_user", JSON.stringify(this.user));

        client.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${this.token}`;

        return { success: true, user: this.user };
      } catch (error) {
        console.error("Login Failed", error);

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          throw new Error(
            `Login failed: ${
              error.response.data.message || error.response.statusText
            }`
          );
        } else if (error.request) {
          // The request was made but no response was received
          throw new Error(
            "No response received from server. Please check your internet connection."
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          throw new Error(`Login error: ${error.message}`);
        }
      }
    },
    async logout() {
      this.user = null;
      this.token = null;

      localStorage.removeItem("access_token");
      localStorage.removeItem("auth_user");
      delete client.defaults.headers.common["Authorization"];
    },

    async checkAuth() {
      if (this.token) {
        client.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${this.token}`;
      } else {
        this.logout();
      }
    },
  },
});
