/*
 * @Author: Donnie
 * @LastEditors: Donnie
 * @Date: 2022-08-29 18:15:12
 * @LastEditTime: 2022-10-10 11:47:52
 * @FilePath: /my-page/src/main.ts
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Toast } from "vant";

import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(Toast);

app.mount("#app");

Toast.setDefaultOptions({ duration: 2000 });

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});
