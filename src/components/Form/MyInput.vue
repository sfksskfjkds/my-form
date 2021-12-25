<template>
  <div>
      <!-- 自定义组件双向绑定v-model： :value @input -->
      <input :type="type" :value="value" @input="onInput">
  </div>
</template>

<script>
export default {
    name: 'my-input',
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