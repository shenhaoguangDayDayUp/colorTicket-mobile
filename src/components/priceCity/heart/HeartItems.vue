<template>
    <div class="list-item">
        <div class="list-item-left"
             @click.stop="leftClick">
            <div v-if="radio"
                 class="list-item-left__radio">
                <div :class="{'radio-selected': selected}" />
            </div>
            <img v-lazy="url"
                 alt=""
                 class="list-item-left__img" />
            <div class='list-item-right'></div>
            <div class="list-item-content">
                <div class="list-item-content__top">
                    <div  class="list-item-content__title text-ellipsis">{{ title}}
                    </div>
                  
                </div>
                <div class="list-item-content__price">
                    <div class="list-item-content_right">
                        <span>  
                             <img src="../../../assets/img/big_gold@2x.png"/>
                        </span>
                             <span class="price">{{price|currency}}</span>
                        </div>
                    <div class="list-item-content_quntity">
                        <slot name="right"></slot>
                    </div>
            
                </div>
            </div>
        </div>
       <!-- <div :style="{'align-items': rightAlign}"
         class="list-item-right">
             <slot name="right" />
       </div> -->

    </div>
 

</template>
<script>
export default {
  mounted(){
        
      // parent.$emit.apply(parent, ['success'].concat(11111));
  },
  props: {
    to: {
      type: [String, Object],
      default: ""
    },
    url: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    desc: {
      type: String,
      default: null
    },
    price: {
      type: [String, Number],
      default: 0
    },
    radio: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    rightAlign: {
      type: String,
      default: "center"
    },
    width: {
      type: String,
      default: "4rem"
    }
  },
  methods: {
    leftClick() {
      if (this.radio) {
        this.$emit("update:selected", !this.selected);
      }
      this.$emit("left-click");
    }
  }
};
</script>

<style lang="scss" scoped>

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3
}
// -webkit-line-clamp: 2 {
//     -webkit-box-orient: vertical;
//     word-break: break-all;
//     text-overflow: ellipsis;
//     overflow: hidden;
// }

.list-item {
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
  background: #2a2c35;
//   border-bottom: 1px solid #e5e5e5;
  height: 258px;
  // margin-bottom: 20px;

  &-left {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    &__img {
      width: 200px;
      height: 200px;
      margin-right: 20px;
      // border-radius: 0.1rem;
    }

    &__radio {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 32px;
      .radio-selected {
        background-image: url("../../../assets/img/fuxuan@1x.png");
        background-repeat: no-repeat;
        background-size: 36px 36px;
        background-position: 0 0;
      }

      & > div {
        width: 36px;
        height: 36px;
        background-image: url("../../../assets/img/juxing@1x.png");
        background-repeat: no-repeat;
        background-size: 36px 36px;
        background-position: 0 0;
      }
    }
    .list-item-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 200px;
      flex: 1;
      align-items: flex-start;
      font-size:28px;
      .list-item-content__title {
        color: white;
        margin-bottom: 0.16rem;
        flex: 1;
       word-wrap:break-word;
      }
      .list-item-content__desc {
        color: #999999;
      }
      .list-item-content__price {
        font-size: 0.32rem;
        line-height: 0.28rem;
        width: 100%;
        color:#e2b51d;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .list-item-content_right{
            flex: 1;
            vertical-align: middle;
            .price{
                margin-left: 10px;
                font-size: 36px;
                 vertical-align: middle;
            }
            img{
              width: 34px;
              height: 34px;
              vertical-align: middle;
            }
        }
        .list-item-content_quntity{
        
        }
      }
    }
  }

  &-right {
    display: flex;
  }
}
</style>

