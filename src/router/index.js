import Vue from "vue";
import Router from "vue-router";
import Login from "../views/Login.vue";
import Facts from "../views/Facts.vue";
import Fact from "../views/Fact.vue";

Vue.use(Router);

const router = new Router({
  mode: "hash",
  routes: [
    { path: "/", redirect: "/facts" },
    { path: "/login", component: Login },
    { path: "/facts", component: Facts },
    { path: "/fact/:id", component: Fact, props: true },
    { path: "*", redirect: "/facts" },
  ],
});

// Auth guard
router.beforeEach((to, from, next) => {
  const isAuth = !!localStorage.getItem("username");
  if ((to.path === "/facts" || to.path.startsWith("/fact")) && !isAuth) {
    next("/login");
  } else if (to.path === "/login" && isAuth) {
    next("/facts");
  } else {
    next();
  }
});

export default router;
