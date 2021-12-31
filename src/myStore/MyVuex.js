
let Vue
class Store {
    constructor(options) {
        this.$options = options
        // 响应式数据state,用户访问形式：$store.state.xxx
        // Vue.util.defineReactive(this,'state',options.state)
        this._vm = new Vue({
            data: {
                $$state: options.state
            }
        })
        
        /* 
            bind方法返回一个新函数，新函数的参数是用户传进来的参数，bind第二个参数开始是默认参数，
            新函数执行时会将默认参数与用户的传参按照顺序放到新函数参数里
        */
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }

    get state() {
        return this._vm.$data.$$state
    }

    set state(val) {
        throw new Error('只能通过触发mutations里面的方法来修改state')
    }


    /* 
        js作用域：
            1.全局作用域：
                声明的变量都会作为window的属性
            2.函数作用域：(若函数内的变量不使用关键字var,let,const定义，则其自动成为全局变量)

            3.ES6新增块级作用域：(可解决闭包问题)
                let,const声明的变量，只属于所处的块级有效，声明前不可使用(暂时性死区，没有变量提升)，let不能重复
                声明，const声明常量不可变
        this指向：
            1.一般指向函数所处的运行环境(上下文对象)，谁调用指向谁(注意区别函数引用赋值)
            
    
    */

    commit(type, params) {
        if (this.$options.mutations[type]) {
            this.$options.mutations[type](this.$options.state,params)
        }
    }

    dispatch(type, params) {
        if (this.$options.actions[type]) {
            this.$options.actions[type](this,params)
        }
    }
}


function install(_Vue) {
    Vue = _Vue
    Vue.mixin({
        // 全局混入给每个组件实例挂载$store
        beforeCreate() {
            if (this.$options && this.$options.store) {
                // Vue根实例挂载$store
                this.$store = this.$options.store
            }else {
                // 子节点挂载$store
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}

/* 
    Object.create(null)：改变新对象原型
        1.新创建出来的原型设置为了null，所以创建出来的对象是一个干净的对象，没有继承任何属性和方法(舍弃了hasOwnProperty,toString....)
        2.null换成其他一个具体的对象，则新对象的原型指向该具体的对象
    new Object({...})/{...}:
        1.新对象的属性是自身属性
        2.继承了Object的属性/方法
*/

/* 
    for in 遍历数组问题：
        1.遍历的是数组的索引(key)，且是string类型
        2.会遍历数组所有 可枚举 属性，包括原型
        3.遍历顺序可能与数组元素实际顺序不一致
        所以for in 更适合遍历对象,如果不想遍历原型，则需要用到hasOwnProperty方法判断一下
    for of：
        1.不能遍历对象(没有迭代器对象)
        2.只能遍历数组/字符串/Map/Set等拥有迭代器对象的集合，可以响应break,continue语句
    forEach：
        不能响应break，continue

*/


export default {
    install,
    Store
}