<template>
    <div class="cy-btn">
        <button :style="buttonStyle" class="btn" :class="classes" :disabled="disabled" :gradients="gradients">
        <slot>{{ text }}</slot>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'submit',
        props: {
            disabled: Boolean,
            mini: Boolean,
            plain: Boolean,
            text: String,
            actionType: String,
            gradients: { //按钮的渐变色
                type: Array,
                validator: function(val) {
                    return val.length === 2
                }
            },
            aLink:{
                type:Boolean,
                default:false
            },
            link:String
        },
        computed: {
            noBorder() {
                return Array.isArray(this.gradients)
            },
            buttonStyle() {
                if (this.gradients) {
                    return {
                        background: `linear-gradient(90deg, ${this.gradients[0]}, ${this.gradients[1]})`,
                        color: '#FFFFFF'
                    }
                }
            },
            classes() {
                return [{
                        'btn_disabled': !this.plain && this.disabled,
                        'btn_plain-disabled': this.plain && this.disabled,
                        'btn_mini': this.mini,
                        'vux-x-button-no-border': this.noBorder
                    }, !this.plain ? `btn_${this.type}` : '',
                    this.plain ? `btn_plain-${this.type}` : '',
                    this.showLoading ? `btn_loading` : ''
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cy-btn{
        width:100%;
        display: flex;
        justify-content: center;
    }
    button {
        background: #ffcb16;
        // box-shadow: 0 2px 6px 0 rgba(0, 32, 99, 0.4);
        color: #000;
        height: 78px;
        width: 590px;
        line-height: 78px;
        letter-spacing: 5px;
        font-size: 31px;
        border-radius: 8px;
        margin-top: 43px;
        a{
            display: block;
            width:100%;
            height:100%;
            margin-top: -70px;
        }
    }
    button:disabled{
        background: #666;
        color: #000;
        height: 78px;
        width: 590px;
        line-height: 78px;
        letter-spacing: 5px;
        font-size: 31px;
        border-radius: 8px;
        margin-top: 43px;
    }
    button:active {
        background: linear-gradient(90deg, rgb(255, 203, 22), rgb(250, 238, 196));
        position:relative;
        top:2px;
    }
    
</style>


