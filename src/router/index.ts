/*
 * @Author: Donnie
 * @LastEditors: Donnie
 * @Date: 2022-08-29 18:15:12
 * @LastEditTime: 2023-03-22 16:08:06
 * @FilePath: /super-page-web/src/router/index.ts
 */
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MiddlePage from "../views/MiddlePage/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/middle",
      name: "middle",
      component: MiddlePage,
      meta: {
        title: "每天开心",
      },
    },
  ],
});

export default router;
