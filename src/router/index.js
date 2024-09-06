import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Dashboard from "../views/Dashboard.vue";
import { useAuthStore } from "../store/auth";
import Affiliates from "../views/Affiliates.vue";
import Recharge from "../views/Recharge.vue";
import Orders from "../views/Orders.vue";
import ResetPassword from "../views/ResetPassword.vue";
import Gateway from "../views/Gateway.vue";
import DadosNf from "../views/DadosNf.vue";
import Postagem from "../views/Postagem.vue";
import Register from "../views/Register.vue";
import ConfigurePost from "../views/ConfigurePost.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: { requiresAuth: false },
  },
  {
    path: "/reset-password/:token",
    name: "ResetPassword",
    component: ResetPassword,
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/affiliates",
    name: "Affiliates",
    component: Affiliates,
    meta: { requiresAuth: true },
  },
  {
    path: "/recharge",
    name: "Recharge",
    component: Recharge,
    meta: { requiresAuth: true },
  },
  {
    path: "/orders/:type",
    name: "Orders",
    component: Orders,
    meta: { requiresAuth: true },
  },
  {
    path: "/integration/:type",
    name: "Gateway",
    component: Gateway,
    meta: { requiresAuth: true },
  },
  {
    path: "/dados-nf",
    name: "DadosNF",
    component: DadosNf,
    meta: { requiresAuth: true },
  },
  {
    path: "/postagem",
    name: "Postagem",
    component: Postagem,
    meta: { requiresAuth: true },
  },
  {
    path: "/postagem/configure",
    name: "ConfigurePost",
    component: ConfigurePost,
    meta: {
      requiresAuth: true,
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (!to.meta.requiresAuth && authStore.isAuthenticated) {
    // If the user is already authenticated, redirect to the dashboard
    return next({
      name: "Dashboard",
    });
  }
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    await authStore.checkAuth();
    if (!authStore.isAuthenticated) {
      return next({
        name: "Login",
      });
    }
  }
  next();
});
