import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Dashboard from "../views/Dashboard.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: ForgotPassword,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
    },
  ],
});
