<template>
  <div class="my-form_item">
      <label :for="prop" v-if="label" :style="{width: form.labelWidth}">{{ label }}</label>
      <div class="my-form_item_content" :style="{'margin-left': form.labelWidth}">
        <!-- 默认插槽，存放MyInput -->
        <slot></slot>
        <!-- 显示校验的错误信息 -->
        <div v-if="error" class="error">{{ error }}</div>
      </div>
  </div>
</template>

<script>
import Skema from 'async-validator'
export default {
    name: 'myFormItem',
    componentName: 'myFormItem',
    props: {
        label: String,
        prop: String,//用于校验的属性
        width: {
            type: String,
            default: '100px'
        }
    },
    inject: ['form'],
    data() {
        return {
            error: ''
        }
    },
    mounted() {
        this.$on('validate', () => {
            // 执行校验
            this.validate()
        })
    },
    methods: {
        validate() {
            // 执行校验需要知道以下两点，可通过注入的form获取
            // 1.校验的规则rules
            const rules = this.form.rules[this.prop]
            // 2.当前值
            const value = this.form.model[this.prop]
            // 3.利用async-validator库执行校验
            // 创建校验描述对象,key为校验的属性，值为校验的规则
            const desc = {[this.prop]: rules }
            // 创建Skema实例
            const skema = new Skema(desc)
            // 执行校验,传入校验源,skema.validate返回的是一个promise对象，这里将其返回方便全局校验
            return skema.validate({[this.prop]: value}, errors => {
                if(errors) {
                    // 错误存在则显示用户定义的错误信息
                    this.error = errors[0].message
                }else {
                    // 校验通过
                    this.error = ''
                }
            })
        }
    }
}
</script>

<style scoped>
/* alt+shift+a:多行注释
百分比：margin,padding,relative根据父元素宽高决定(一般根据父元素宽高来)，absolute根据定位父级来

*/
.my-form_item {
    margin-bottom: 1.2rem;
}
label {
    text-align: right;
    vertical-align: middle;
    float: left;
    padding: 0 12px 0 0;
    box-sizing: border-box;/*padding和boder加在label宽度内，防止padding:12px造成布局混乱*/
}
.my-form_item_content {
    position: relative;/*不脱离文档流，根据自身静态位置定位，若未设置宽度，则其宽度为父元素宽度*/
}
.error {
    color: red;
    font-size: 0.8rem;
    position: absolute;
    top: 100%;/*absolute定位脱离文档流，根据设置有relative的父/祖先元素定位，百分比也是根据父/祖先宽高的百分比计算，若未设置宽度，则其宽度由里面内容决定*/
    left: 0;
}
</style>