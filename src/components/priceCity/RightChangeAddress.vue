<template>
  <div class="change-address"
       @click='editAddress'>
    <div class="receive">
      <span class='title'>收货人:</span>
      <span>{{item.name}}</span>
    </div>
    <div class="tel">
      {{item.mobileNumber}}
    </div>
    <div class="receive-detail">
      <!-- <div class="address"> -->
      <div class='receive-detail-title'>
        <span style="">详细地址:</span>{{item.province}}{{item.city}}{{item.district}}{{item.street}}
      </div>
      <!-- </div> -->
      <div class="right-img"
           v-if='show'>
        <span class="right-arrow "></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RightChange",
  methods: {
    editAddress() {
      if (this.showEidt) {
        this.$router.push({
          name: "ReceiversList",
          query: { code: this.item.code }
        });
      }
    }
  },
  computed: {
    show: {
      get() {
        return this.showEidt;
      },
      set(val) {
        this.$emit("update:showEidt", val);
      }
    }
  },
  props: {
    showEidt: {
      type: [Boolean],
      default() {
        return true;
      }
    },

    item: {
      type: [Object, String],
      default() {
        return "";
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.right-arrow {
  display: inline-block;
  border-right: 5px solid #ccc;
  border-bottom: 5px solid #ccc;
  width: 22px;
  height: 22px;
  transform: rotate(315deg);
  -webkit-transform: rotate(315deg);
}
.change-address {
  height: 230px;
  width: 100%;
  background: #2a2d36;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  //   justify-content: space-between;
  font-size: 28px;
  .receive {
    height: 108px;
    width: 50%;
    line-height: 108px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    //   flex: 1;
    .title {
      margin-left: 20px;
    }
    .name {
      margin-left: 20px;
    }
  }
  .tel {
    flex: 1;
    line-height: 108px;
    text-align: right;
    margin-right: 67px;
  }
  .receive-detail {
    padding-right: 20px;
    padding-left: 20px;
    height: 122px;
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .right-img {
      width: 30px;
      // right: 0;
      // top: 30px;
      // position: absolute;
    }
    .receive-detail-title {
      margin-right: 20px;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
}
</style>


