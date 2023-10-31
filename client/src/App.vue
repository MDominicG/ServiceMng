<script setup>
import { RouterLink, RouterView, useRouter, useRoute } from "vue-router";

import { store } from "./store";

import '@/assets/css/style.css';
import '@/assets/css/simplebar.css';
import '@/assets/css/examples.css';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
const router = useRouter();
const route = useRoute();
const logout = async () => {
  localStorage.clear();
  store.updateHasLogin(false);
  store.updateName(null);
  router.push("/login");
};
</script>

<template>


  <router-view v-slot="{ Component}">
    <!-- Use any custom transition and  to `fade` -->
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="$route.path" />
    </transition>
  </router-view>
</template>
