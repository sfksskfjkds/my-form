<template>
  <div>
      <label v-if="label">{{ label }}</label>
      <!-- 默认插槽，存放MyInput -->
      <slot></slot>
      <!-- 显示校验的错误信息 -->
      <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
    name: 'MyFormItem',
    props: {
        label: String,
    },
    data() {
        return {
            error: ''
        }
    }
}
</script>

<style>

</style>