<template>
  <div :class="['my-notice', {'notice-success': type === 'success','notice-error': type === 'error'}]" v-if="isShow">
      {{ message }}
  </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            default: ''
        },
        dulation: {
            type: Number,
            default: 2000
        },
        type: {
            type: String,
            default: 'success'
        }
    },
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        show() {
            this.isShow = true;
            setTimeout(() => {
                this.isShow = false
            },this.dulation)
        },
        // hide() {
        //     this.isShow = false;
        //     // 删除组件，要求组件实例上实现remove方法，这里在创建组件实例的create.js中实现
        //     this.remove()
        // }
    }
}
</script>

<style scope>
.my-notice {
    position: fixed;
    color: ghostwhite;
    text-align: center;
    top: 5px;
    left: 50%;
    transform: translate(-50%);
    padding: 5px 20px;
    width: 20%;
}
.notice-success {
    background: forestgreen;
}
.notice-error {
    background: red;
}
</style>