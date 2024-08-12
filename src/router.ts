import { createRouter, createWebHistory } from "vue-router";
import authService from "./services/authService";
import LoginView from "./views/LoginView.vue";
import UserList from "./views/UserList.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    beforeEnter: (to, from, next) => {
      if (authService.isAuthenticated()) {
        next({ path: "/dashboard/user" });
      } else {
        next();
      }
    },
  },
  {
    path: "/dashboard/user",
    component: UserList,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authService.isAuthenticated()) {
    next("/login");
  } else {
    next();
  }
});

export default router;
