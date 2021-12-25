<template>
  <div>
      <!-- 自定义组件双向绑定v-model： :value @input -->
      <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
export default {
    name: 'my-input',
    inheritAttrs: false,//避免未被props接收的一些属性设置到当前组件根元素上
    props: {
        value: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        }
    },
    methods: {
        onInput(e) {
            // 派发input事件，配合自定义组件的v-model
            this.$emit('input',e.target.value)
        }
    }

}
</script>

<style>

</style>