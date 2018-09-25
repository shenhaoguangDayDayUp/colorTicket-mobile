<template>  
  <div class="mint-tab-item"  
    @click="$parent.$emit('input', id)"  
    :class="{ 'is-selected': $parent.value === id }">  
    <router-link :to="route">  
      <div class="mint-tab-item-icon"><slot name="icon"></slot></div>  
      <div class="mint-tab-item-label"><slot></slot></div>  
    </router-link>  
  </div>  
</template>  
  
<script>  
import {  TabItem } from 'mint-ui';  
/** 
 * mt-tab-item 
 * @module components/tab-item 
 * @desc 搭配 tabbar 或 navbar 使用 
 * @param {*} id - 选中后的返回值，任意类型 
 * @param {slot} [icon] - icon 图标 
 * @param {slot} - 文字 
 * 
 * @example 
 * <mt-tab-item> 
 *   <img slot="icon" src="http://placehold.it/100x100"> 
 *   订单 
 * </mt-tab-item> 
 */  
export default {  
  name: 'TabItem2',  
  extends:TabItem,  
  props: ['id','route']  
};  
</script>  