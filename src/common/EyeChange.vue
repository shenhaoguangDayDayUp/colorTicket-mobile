<template>
    <div :class="['icon-eye', {'eye-grey':eyeChange}]" @click="handleEyeClick($event)"></div>
</template>
<script>
export default {
    data(){
        return{
            eyeChange:false
        }
    },
    methods:{
        handleEyeClick($event){
            this.eyeChange = !this.eyeChange;
            event.target.previousElementSibling.type = (event.target.previousElementSibling.type == 'text')?'password':'text';
        }
    },
}
</script>
