<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MyForm",
  componentName: 'MyForm',
  props: {
    // 接收数据模型和校验规则
    model: {
      type: Object,
      require: true,
    },
    rules: Object,
    labelWidth: {
      type: String,
      default: '4rem'
    }
  },
  provide() {
    return {
      // 将form组件实例注入到子孙组件中
      form: this,
    };
  },
  created() {
    this.formItems = []
    this.$on('addFormItem',formItem => {
      this.formItems.push(formItem)
    })
    this.$on('removeFormItem',formItem => {
      this.formItems.splice(this.formItems.indexOf(formItem),1)
    })
  },
  methods: {
    validate(cb) {
      // 表单全局校验方法，遍历每个formItem，调用对应的validate方法(这里$children与formItem强耦合)
      // 获取所有校验结果的promise对象(过滤掉没有prop属性的子组件)
      // const tasks = this.$children
      // .filter(child => child.prop)
      // .map(child => {
      //   return child.validate()
      // })
      const tasks = this.formItems.map(formItem => {
        return formItem.validate()
      })
      // 统一处理所有Promise结果并返回校验结果
      Promise.all(tasks).then(() => {
        cb(true)
      }).catch(() => {
        cb(false)
      })
    }
  }
};
</script>

<style></style>
