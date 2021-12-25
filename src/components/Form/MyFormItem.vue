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
    name: 'MyFormItem',
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
            // 执行校验,传入校验源
            skema.validate({[this.prop]: value}, errors => {
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
.my-form_item {
    position: relative;
    margin-bottom: 1.2rem;
}
.my-form_item:after,.my-form_item:before {
    display: table;
    content: "";
}
label {
    text-align: right;
    vertical-align: middle;
    float: left;
    padding: 0 12px 0 0;
    box-sizing: border-box;
}
.my-form_item_content {
    position: relative;
}
.error {
    color: red;
    font-size: 0.8rem;
    position: absolute;
    top: 100%;
    left: 0;
}
</style>