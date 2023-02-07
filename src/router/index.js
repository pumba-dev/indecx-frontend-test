// Vue Router
import { createRouter, createWebHistory } from "vue-router";

// Components
import Login from "@/components/pages/LoginPage.vue";
import Register from "@/components/pages/RegisterPage.vue";
import ForgotPassword from "@/components/pages/ForgotPasswordPage.vue";
import Dashboard from "@/components/pages/DashboardPage.vue";
import ResetPassword from "@/components/pages/ResetPasswordPage.vue";

import validations from "./router-validations";

// Routes
const routes = [
  // ######  BEFORE AUTHENTICATION ######
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: Login,
  },
  {
    path: "/",
    name: "home",
    component: Login,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/reset-password/:",
    name: "reset-password",
    component: ResetPassword,
    props: (route) => ({
      mode: route.query.mode,
      oobCode: route.query.oobCode,
    }),
  },

  // After Authentication
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
];

// Create Router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Router Validations
router.beforeEach((to) => {
  return validations(to);
});

export default router;
