<template>
  <div class="page-title gradient">{{ title.split(" ")[0] }}</div>
  <main class="page-main">
    <div>
      <img alt="Product image" :src="picture" class="picture" />
    </div>
    <div class="product-info">
      <div class="title">{{ title }}</div>
      <div class="pay">
        <div class="price">
          <text class="price-tip gradient">付费价</text>
          <text class="rmb">¥</text>
          <text>{{ pay }}</text>
        </div>
        <div class="bonus">
          <text class="bonus-tip">约返:</text>
          <!-- <text class="rmb">¥</text> -->
          <text>{{ bonus }}</text>
        </div>
      </div>
      <div @click="copyTKL" class="tkl">
        <img src="../../assets/tp1tklbg.png" class="tkl-image" />
        <div class="tkl-front">
          <span id="tkl-text" class="tkl-text">{{ tkl }}</span>
          <div>立即复制</div>
        </div>
      </div>
      <div class="tips">
        <div>点击立即复制 -> 打开手机淘宝 App 即可</div>
        <div>限时活动，手慢无</div>
      </div>

      <!-- <a :href="url" class="go-buy"> 打开淘宝 App </a> -->
      <!-- <a @click="copyTKL" class="go-buy">点击 ➡️ 打开手淘</a> -->
    </div>
  </main>
</template>

<script lang="ts">
import UseClipboard from "vue-clipboard3";
import axios from "axios";
import { reactive } from "vue";
import { Toast } from "vant";
import "vant/es/toast/style";
import TaobaoImage from "../../assets/taobao.png";

const { toClipboard } = UseClipboard();

export default {
  setup() {
    const data = reactive({
      tkl: "",
      picture: "",
      pay: "",
      bonus: "",
      title: "",
      url: "",
    });
    return data;
  },
  components: {},
  mounted() {
    const url = decodeURI(window.location.href);
    const key = url.substring(url.indexOf("key=") + 4, url.length);

    this.loadData(key);

    document.addEventListener("touchstart", function (event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    });

    let lastTouchEnd = 0;

    document.addEventListener(
      "touchend",
      function (event) {
        const now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      },
      false
    );

    document.addEventListener("gesturestart", function (event) {
      event.preventDefault();
    });

    //自动选中
    document.addEventListener(
      "selectionchange",
      function () {
        const select = window.getSelection();
        const word = document.querySelector(".tkl-text");
        if (select && word) {
          select.selectAllChildren(word);
        }
      },
      false
    );
  },
  methods: {
    async loadData(key: string) {
      const info = await axios.post("/api/tkl", {
        key,
      });
      const { data } = info;
      this.picture = data["picture"];
      this.title = data["Title"];
      this.pay = data["Pay"];
      this.bonus = data["bonus"];
      this.url = data["url"];

      const number = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      this.tkl = `CZ${number} ￥${data["tkl"]}￥/`;
    },
    async copyTKL() {
      await toClipboard(this.tkl);
      Toast({
        message: "复制成功\n快去打开淘宝",
        icon: TaobaoImage,
        duration: 2000,
      });
    },
    randomCoding() {
      const result: never[] = [];
      const n = 2;
      for (let i = 0; i < n; i++) {
        const ranNum = Math.ceil(Math.random() * 25);
        result.push(String.fromCharCode(65 + ranNum) as never);
      }
      return result.join("");
    },
  },
};
</script>

<style>
@import "./index.css";
</style>
