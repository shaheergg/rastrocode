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
        this.user = response.data.data.user;
        this.token = response.data.data.access_token;
        localStorage.setItem("access_token", this.token);
        localStorage.setItem("auth_user", JSON.stringify(this.user));

        client.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${this.token}`;
      } catch (error) {
        console.error("Login Failed", error);
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
