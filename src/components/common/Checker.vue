<template>
    <label class="mint-checklist-label" :ischoosen.sync='isShow' >
        <span class="mint-checkbox">
        <input type="checkbox" v-model='isShow' class="mint-checkbox-input" > 
        <span class="mint-checkbox-core">
        </span>
        </span> 
        <span class="mint-checkbox-label">{{checkerTitle}}</span>
    </label>
</template>
<script>
    export default {
        computed:{
            isShow:{ 
                get(){
                    return this.ischoosen;
                },
                set(val){
                    return this.$emit('update:ischoosen',val);
                }
            }
        },
        props: {
            checkerTitle: {
                type: [String],
                default () {
                    return "";
                }
            },
            ischoosen: {
                default () {
                    return false;
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .mint-checklist-label.mychecker{
        display: block;
        padding: 0;
    }
    .mint-checkbox-core {
        border-radius: 3px;
        background-color: transparent;
        height: 27px;
        width: 27px;
    }
    .mint-checkbox-input:checked+.mint-checkbox-core {
        background-color: transparent;
        border: solid 2px #d6dae2;
    }
    .mint-checkbox-input:checked+.mint-checkbox-core::after {
        border-color: #ffcb16;
        width: 10px;
        height: 15px;
        left: 7px;
        top: -3px;
    }
</style>


