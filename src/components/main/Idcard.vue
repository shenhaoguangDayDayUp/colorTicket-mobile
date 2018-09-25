<template>
    <div class="mine_idcard" id="mine_idcard">
        <Header title="上传身份证" :isShow="true" @clickRtn="clickRtn"></Header>
       <div class="cy-uploader cy-uploader-idcard">
           <div class="cy-upload-idcard">
               <div class="idcard-wrap">
                    <img src="../../assets/img/ic_plus_.png" class="cy-uploader-icon">
                    <span>请上传证件正面图片</span>
                    <!-- <span>支持格式,大小不超过</span> -->
               </div>
                <img alt="" id="img1" :src="src" class="upload-img">
                <input type="file" name="idcard" class="cy-upload__input" @change="change($event)" id='0'>
           </div>
        </div>
        <div class="cy-uploader cy-uploader-idcard">
           <div class="cy-upload-idcard">
               <div class="idcard-wrap">
                    <img src="../../assets/img/ic_plus_.png" class="cy-uploader-icon">
                    <span>请上传证件背面图片</span>
                    <!-- <span>支持格式,大小不超过</span> -->
               </div>
                <img alt="" id="img2" :src="src1"   class="upload-img">
                <input type="file" name="idcard" class="cy-upload__input" @change="change1($event)" id='1'>
           </div>
        </div>
    </div>
</template>
<script>
import '@/style/clipper.scss';
import Header from "../common/Header"; 
import {authApi} from "@/api/api";
export default {
  name: 'idCard',
  data() {
    return {
        src:'',
        src1:'', // 图片开关
    }
  },
  mounted(){
    this.getFront();
    this.getBack();
  },
  methods: {
    clickRtn(){ //移除头像的裁切框
        if(typeof(this.reagion)!=="undefined"){this.destoried()}; //只有当裁剪页面返回时候清除
    },
    change(e){
        // alert(e.path[0].id)
        // e.path[0].id == 0 ? this.uploadImg('img1','idCardFront') : this.uploadImg('img2','idCardBack');
        // alert(2)
        let image = document.getElementById('img1');
        this.clip(event,{
          resultObj:image,
          aspectRatio: 8 / 5, // 身份证是1.6：1
          type:'idCardFront'
        })
    },
    change1(e){
        let image = document.getElementById('img2');
        this.clip(event,{
          resultObj:image,
          aspectRatio: 8 / 5,
          type:'idCardBack'
        })
    },
    uploadImg(img,type){ 
        let image = document.getElementById(img);
        this.clip(event,{
          resultObj:image,
          aspectRatio: 8 / 5,
          type:type
        })
    },
    async getFront(){
        try{
            const res = await authApi.front({},{headers:{'x-auth-token':sessionStorage.getItem('TOKEN')},responseType: "arraybuffer"});
            this.src = this.arrayBufferToBase64(res.data);
        }catch(err){}
    },
    async getBack(){
        try{
            const res = await authApi.back({},{headers:{'x-auth-token':sessionStorage.getItem('TOKEN')},responseType: "arraybuffer"});
            this.src1 = this.arrayBufferToBase64(res.data);
        }catch(err){}
    },
    arrayBufferToBase64(buffer){
        return 'data:image/png;base64,' + btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''))
    }
  },

  components:{
      Header,
  }
}
</script>
<style lang="scss" scoped>
.mine_idcard{
    color:#fff;
    padding-top:94px;
    height:100%;
    .cy-uploader-idcard{
        padding:20px;
        width:600px; //比例是16：9
        height:375px;
        margin:0 auto;
    }
    .cy-upload-idcard{
        height:100%;
        border: 2px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        overflow: hidden;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        input{
                width:100%;
                height:100%;
                opacity: 0;
                position: absolute;
                top:0;
                left:0;
        }
        .upload-img{
            position: absolute;
            top:0;
            height:100%;
        }
        .idcard-wrap{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color:#ffcb16;
            img{
                height:65px;width:65px;
                margin:0 auto;
            }
            
        }
        
    }
    .cy-upload-idcard:hover{
            border: 2px dashed #ffcb16;
        }
}
</style>




