import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import VehicleView from "../views/VehicleView.vue";
import VehiclesView from "../views/VehiclesView.vue";
import axios from "../axios";
import { store } from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: false },
    },
    {
      path: '/vehicle/:id',
      name: 'vehicle',
      component: VehicleView,
      props: route => ({ id: route.params.id }),
      meta: { requiresAuth: false },
    },
    {
      path: '/vehicles',
      name: 'vehicles',
      component: VehiclesView,
      props: route => ({ id: route.params.id }),
      meta: { requiresAuth: false },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/SignIn.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/SignUp.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  try {
    const authenticated = await is_authenticated();
    if (to.meta.requiresAuth && !authenticated) {
      // User is not authenticated, redirect to login
      return { path: "/login" };
    }
    if ((to.path === "/login" || to.path === "/register") && authenticated) {
      // User is authenticated and trying to access login, redirect to dashboard
      return { path: "/" };
    }
  } catch (err) {
    alert('server is down');
  }
});

async function is_authenticated() {
  try {
    const response = await axios.get("profile/");
    store.updateName(response.data.username);
    return true;
  } catch (err) {
    return false;
  }
}

export default router;
