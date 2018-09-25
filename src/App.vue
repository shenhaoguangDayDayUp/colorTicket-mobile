<template>
  <div id="app">
    <!-- <div> -->
      <transition name="fade">
        <keep-alive>
          <router-view v-if='$route.meta.keepAlive' :style="loding"></router-view>
        </keep-alive>
      </transition>
    <!-- </div> -->
    <transition name="fade">
      <router-view v-if='!$route.meta.keepAlive'></router-view>
    </transition>
    <!-- 路由跳转必写 -->
    <div v-transfer-dom>
      <!-- <loading :show="isLoading"
               :text="''"
               
               :position='"absolute"'></loading> -->
    </div>
  </div>
</template>

<script>
import { Loading, TransferDomDirective as TransferDom } from "vux";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      transitionName: "slide-left",
      loding: {}
    };
  },
  directives: {
    TransferDom
  },
  computed: {
    ...mapGetters(["isLoading"]),
    // isKeepAlive() {
    //   console.log('keepalive');
    //   console.log(!this.$route.meta.scrollToTop)
    //   return !this.$route.meta.scrollToTop;
    // }
  },
  components: {
    Loading
  },
  watch: {
    $route: function(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
   
    }
  },
  methods: {},
  mounted() {
    document.documentElement.addEventListener(
      "touchstart",
      function(event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      },
      false
    );
    var lastTouchEnd = 0;
    document.documentElement.addEventListener(
      "touchend",
      function(event) {
        var now = Date.now();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      },
      false
    );
    document.getElementById("app").style.display = "block";
    document.getElementById("appLoading").style.display = "none";

    this.$root.eventHub.$on("LodingShow", res => {
      document.querySelector("body").style =
        "display:block;height:100%;overflow:hidden !important;font-size:" +
        document.querySelector("body").style.fontSize;
    });
    this.$root.eventHub.$on("LodingHide", res => {
      document.querySelector("body").style =
        "font-size:" + document.querySelector("body").style.fontSize;
    });
  }
};
</script>

<style lang="scss">
#app {
  height: 100%;
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
#cancel_clip {
  border: 1px solid #ffcb16 !important;
  color: #ffcb16 !important;
  background: #fff !important;
  border-radius: 5px !important;
  width: 100px !important;
  height: 40px !important;
}
#clip_button {
  background: #ffcb16 !important;
  border-radius: 5px !important;
  width: 100px !important;
  height: 40px !important;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.cy_app_form{
    font-size:26px;
    height:100%;
    overflow: hidden;
    background: url("assets/img/bg.jpg") no-repeat;
    background-size: cover;
}
</style>

 