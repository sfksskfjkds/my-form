<template>
  <div class="hello">
    <My-form :model="userInfo" :rules="rules" ref="myForm" style="width: 96%">
      <My-form-item label="用户名" prop="userName">
        <My-input v-model="userInfo.userName" placeholder="请输入用户名" />
      </My-form-item>
      <My-form-item label="密码" prop="password">
        <My-input type="password" v-model="userInfo.password" placeholder="请输入密码" />
      </My-form-item>
      <My-form-item>
        <button @click="validate">验证</button>
      </My-form-item>
    </My-form>
  </div>
</template>

<script>
import MyInput from '@/components/Form/MyInput.vue'
import MyFormItem from '@/components/Form/MyFormItem.vue'
import MyForm from '@/components/Form/MyForm.vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {                    
    MyInput,
    MyFormItem,
    MyForm
  },data() {
    return {
      userInfo: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [{required: true, message: '请输入用户名'}],
        password: [{required: true, message: '请输入密码'}]
      }
    }
  },
  methods: {
    validate() {
      this.$refs.myForm.validate(valid => {
        if (valid) {
          this.$notice1({
            message: '验证通过 √'
          })
        }else {
          this.$notice1({
            message: '验证失败 ×',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
