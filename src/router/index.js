// Vue Router
import { createRouter, createWebHistory } from "vue-router";

// Components
import Login from "@/components/pages/LoginPage.vue";
import Register from "@/components/pages/RegisterPage.vue";
import ForgotPassword from "@/components/pages/ForgotPasswordPage.vue";
import Dashboard from "@/components/pages/DashboardPage.vue";

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

// // Router Validations
// router.beforeEach((to) => {
//   return routerValidations(to);
// });

export default router;
