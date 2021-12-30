<template>
  <div class="my-input">
    <!-- 
        自定义组件双向绑定v-model：相当于
            1.绑定value属性 :value="parentVal"
            2.绑定input事件更新 @input="parentVal = $event.target.value"
        自定义组件内部：
            1.绑定value属性，属性值为用户传进来的value(props接收的)
            2.绑定input事件，emit('input')触发用户绑定的事件
        $attrs: 一般接收一些用户传入的原生属性，比如：placeholder,title....
        -->
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
import emitter from "@/mixins/emitter";
export default {
  name: "my-input",
  componentName: "myInput",
  inheritAttrs: false, //避免未被props接收的一些属性设置到当前组件根元素上
  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
  },
  mixins: [emitter],
  methods: {
    onInput(e) {
      // 派发input事件，配合自定义组件的v-model
      this.$emit("input", e.target.value);
      // 通知父级执行校验,这里用$parent与MyFormItem组件强耦合，当myFormItem与myInput之间存在其他组件时无法触发校验，so?
      // this.$parent.$emit('validate',e.target.value)
      /* 
                解决办法是混入一个dispatch方法，传入组件定义的componeName,循环向上查找myFormItem组件，
                找到则让该组件触发校验(组件的监听与触发必须是同一个组件原则)
             */
      this.dispatch("myFormItem", "validate");
    },
  },
};
</script>

<style scope>
.my-input {
  width: 100%;
}
input {
  width: 100%;
  /* 防止浏览器自带的border和padding造成input宽度超过100% */
  box-sizing: border-box;
}
</style>