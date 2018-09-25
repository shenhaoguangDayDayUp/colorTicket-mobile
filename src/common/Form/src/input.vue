<template>
  <div :class="[
    type === 'textarea' ? 'cy-textarea' : 'cy-input',
    size ? 'cy-input--' + size : '',
    {
      'is-disabled': disabled,
      'cy-input-group': $slots.prepend || $slots.append,
      'cy-input-group--append': $slots.append,
      'cy-input-group--prepend': $slots.prepend
    }
  ]">
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="cy-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <!-- input 图标 -->
      <slot name="icon">
        <i class="cy-input__icon"
          :class="[
            'cy-icon-' + icon,
            onIconClick ? 'is-clickable' : ''
          ]"
          v-if="icon"
          @click="handleIconClick">
        </i>
      </slot>
      <input
        v-if="type !== 'textarea'"
        class="cy-input__inner"
        v-bind="$props"
        :autocomplete="autoComplete"
        :value="currentValue"
        ref="input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <div class="input-eye" v-show="eyeShow"><div :class="['icon-eye', {'eye-grey':eyeChange}]" @click="handleEyeClick"></div></div>
      <div class="input_tel_code" v-show="codeShow" @click="handleSmsCode">
        <span v-if="sendSmsCode">发送验证码</span>
        <span v-else>{{smsCodeCount}}秒后重发</span>
      </div>
      <!-- <i class="cy-input__icon cy-icon-loading" v-if="validating"></i> -->
      <!-- 后置元素 -->
      <div class="cy-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
  </div>
</template>
<script>
  import emitter from './emitter';
  import calcTextareaHeight from './calcTextareaHeight';

  export default {
    name: 'CyInput',

    componentName: 'CyInput',

    mixins: [emitter],

    data() {
      return {
        currentValue: this.value,
        textareaCalcStyle: {},
        eyeChange:false,
      };
    },
    props: {
      value: [String, Number],
      placeholder: String,
      size: String,
      resize: String,
      readonly: Boolean,
      autofocus: Boolean,
      icon: String,
      disabled: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      name: String,
      autosize: {
        type: [Boolean, Object],
        default: false
      },
      rows: {
        type: Number,
        default: 2
      },
      autoComplete: {
        type: String,
        default: 'off'
      },
      form: String,
      maxlength: Number,
      minlength: Number,
      max: {},
      min: {},
      step: {},
      validateEvent: {
        type: Boolean,
        default: true
      },
      onIconClick: Function,
      eyeShow:{
        type:Boolean,
        default: false
      },
      codeShow:{
        type:Boolean,
        default:false
      },
      sendSmsCode:{
        type:Boolean,
        default:true
      },
      smsCodeCount:{
        type:Number,
        default:60
      }
    },
    computed: {
      validating() {
        return this.$parent.validateState === 'validating';
      },
    },
    watch: {
      'value'(val, oldValue) {
        this.setCurrentValue(val);
      }
    },

    methods: {
      handleBlur(event) {
        // console.log('event');
        // console.log(event);
        this.$emit('blur', event);
        if (this.validateEvent) {
          this.dispatch('CyFormItem', 'el.form.blur', [this.currentValue]);
        }
      },
      inputSelect() {
        this.$refs.input.select();
      },
      resizeTextarea() {
        if (this.$isServer) return;
        var { autosize, type } = this;
        if (type !== 'textarea') return;
        if (!autosize) {
          this.textareaCalcStyle = {
            minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
          };
          return;
        }
        const minRows = autosize.minRows;
        const maxRows = autosize.maxRows;

        this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
      },
      handleFocus(event) {
        // console.log('handleFocus');
        
        this.$emit('focus', event);
      },
      handleInput(event) {
        const value = event.target.value;
        this.$emit('input', value);
        this.setCurrentValue(value);
        this.$emit('change', value);
      },
      handleIconClick(event) {
        if (this.onIconClick) {
          this.onIconClick(event);
        }
        this.$emit('click', event);
      },
      setCurrentValue(value) {
        if (value === this.currentValue) return;
        this.$nextTick(_ => {
          this.resizeTextarea();
        });
        this.currentValue = value;
        if (this.validateEvent) {
          this.dispatch('CyFormItem', 'el.form.change', [value]);
        }
      },
      // 密码状态切换
      handleEyeClick(){
        this.eyeChange = !this.eyeChange;
        this.$el.children[0].type = (this.$el.children[0].type == 'text'?'password':'text');
      },
      //手机动态码
      handleSmsCode(){
        this.$emit('handleSmsCode');
      }
    },
    created() {
      this.$on('inputSelect', this.inputSelect);
    },

    mounted() {
      this.resizeTextarea();
    }
  };
</script>
<style lang="scss" scoped>
.cy-input {
  display: flex;
  justify-content: space-between;
}
.cy-form-item__content .cy-input input {
        /* -webkit-tap-highlight-color: rgba(255, 255, 255, 0); */
        -moz-user-select: none;
        -webkit-appearance: none;
        outline: none!important;
        -webkit-box-shadow: 0 0 0px 1000px transparent inset;
        background-color: transparent;
        filter: alpha(opacity=0);
         border: none!important;
          width: 70%;
          outline: 0;
          overflow: hidden;
          font-size: 28px;
          height: 46px;
    }
  .input-eye{
    height: 46px;
    width:40px;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-eye{
      width:40px;
      height:20px;
      background: url("../../../assets/img/hide.png");
          background-size: cover;
      }
      .eye-grey{
        height:26px;
        background: url("../../../assets/img/show.png");
            background-size: cover; 
      }
  }
  .input_tel_code{
    line-height: 46px;
  }
</style>

