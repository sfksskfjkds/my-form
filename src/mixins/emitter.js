export default {
    methods: {
        dispatch(componentName,eventName,params) {
            let parent = this.$parent || this.$root
            let name = parent.$options.componentName
            // 向上循环查找对应的parent,直到parent不存在或者找到对应的组件
            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent
                if (parent) {
                    name = parent.$options.componentName
                }
            }
            if (parent) {
                // apply展开参数，方便后续操作
                parent.$emit.apply(parent,[eventName].concat(params))
            }
        }
    }
}




{/* <template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <My-form :model="userInfo" :rules="rules" ref="myForm" style="width: 500px">
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
  name: 'App',
  components: {
    MyInput,
    MyFormItem,
    MyForm
  },
  data() {
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
          }).show()
        }else {
          this.$notice1({
            message: '验证失败 ×',
            type: 'error'
          }).show()
        }
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> */}
