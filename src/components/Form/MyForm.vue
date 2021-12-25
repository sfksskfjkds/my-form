<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MyForm",
  props: {
    // 接收数据模型和校验规则
    model: {
      type: Object,
      require: true,
    },
    rules: Object,
    labelWidth: {
      type: String,
      default: '100px'
    }
  },
  provide() {
    return {
      // 将form组件实例注入到子孙组件中
      form: this,
    };
  },
};
</script>

<style></style>
