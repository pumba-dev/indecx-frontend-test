// Vue Router
import { createRouter, createWebHistory } from "vue-router";

// Components
import Login from "@/components/pages/LoginPage.vue";
import ForgotPassword from "@/components/pages/ForgotPasswordPage.vue";

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
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPassword,
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
