import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Dashboard from "../views/Dashboard.vue";
import { useAuthStore } from "../store/auth";
import Affiliates from "../views/Affiliates.vue";
import Recharge from "../views/Recharge.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
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
