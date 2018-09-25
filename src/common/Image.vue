<template>
  <div class="imgs">
  <img 
        class='sd__imgview__content'
        style="width:100%; height:100%;" 
        :src='imageSrc'/> 

</div>
</template>
<script>
export default {
  props:{
     imageSrc:{
         type:String,
         default: '',
     } 
  }
}
</script>
<style scoped>
.imgs{
      background-color:#e3e3e3;
      position:relative;
      overflow: hidden;
  }
.sd__imgview__content {
  position: relative;
  z-index: 10;
}
</style>


