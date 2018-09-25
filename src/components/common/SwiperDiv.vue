<template>
    <div class="clearfix" ref="bar">
        <slot></slot>
    </div>
</template>

<script>
export default {
  updated() {
    var bar = this.$refs.bar;
    var childrenArr = bar.children;
    if (childrenArr[0]) {
      var cWidth = childrenArr[0].clientWidth;
      var cNum = childrenArr.length;
      var cMarginR = 0;
      var marginR = window.getComputedStyle(childrenArr[0], null)[
        "margin-right"
      ];
      if (marginR) {
        cMarginR = parseFloat(marginR);
      }
      bar.style.width = (cWidth + cMarginR) * cNum + "px";
    }
  },
  mounted() {
    var bar = this.$refs.bar;
    var childrenArr = bar.children;
    if (childrenArr[0]) {
      var cWidth = childrenArr[0].clientWidth;
      var cNum = childrenArr.length;
      var cMarginR = 0;
      var marginR = window.getComputedStyle(childrenArr[0], null)[
        "margin-right"
      ];
      if (marginR) {
        cMarginR = parseFloat(marginR);
      }
      bar.style.width = (cWidth + cMarginR) * cNum + "px";
    }
  }
};
</script>

