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

<script>
import Iconv from "iconv-lite";
import UseClipboard from "vue-clipboard3";
import "vant/es/toast/style";

const { toClipboard } = UseClipboard();

export default {
  data() {
    return {
      tkl: "",
      picture: "",
      pay: "",
      bonus: "",
      title: "",
      url: "",
    };
  },
  components: {},
  mounted() {
    const url = decodeURI(window.location.href);
    const paraString = url.substring(url.indexOf("key=") + 4, url.length);
    if (paraString.length) {
      const base64 = atob(paraString);
      Iconv.skipDecodeWarning = true;
      const gbk = Iconv.decode(base64, "gbk");
      const params = JSON.parse(gbk);
      console.log(params);
      console.log(params["picture"]);
      this.picture = params["picture"];
      this.title = params["Title"];
      this.pay = params["Pay"];
      this.bonus = params["bonus"];

      const number = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      this.tkl = `CZ${number} ￥${params["tkl"]}￥/`;

      this.url = params["url"];
      // this.url = `https://s.tb.cn/${this.tkl}`;
      this.url = "https://s.tb.cn/h.Udmv2ot";
      // this.url = "https://www.baidu.com";
      // console.log(`url = ${this.url}`);
    }

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
    async copyTKL() {
      await toClipboard(this.tkl);
      this.$toast({
        message: "复制成功\n快去打开淘宝",
        icon: "https://qiniu.blockss.com/taobao.png",
      });
    },
    randomCoding() {
      const result = [];
      const n = 2;
      for (let i = 0; i < n; i++) {
        const ranNum = Math.ceil(Math.random() * 25);
        result.push(String.fromCharCode(65 + ranNum));
      }
      return result.join("");
    },
  },
};
</script>

<style>
@import "./index.css";
</style>
