import Vue from 'vue';
// 此时的Notice只是一个模板文件，经过render函数编译后才具有vue的功能
import Notice from '@/components/MyNotice'
// 通过render函数创建vue组件实例
function create(Component, props) {
    const vm = new Vue({
        // h是createElement,返回的是虚拟DOM，通过挂载变成真实DOM
        render: h => h(Component, { props })
        /* $mount函数不指定宿主元素不会进行dom的追加操作，只是将生成的dom($el)挂载到实例上
        ($mount函数不能直接指定body,指定body的话整个body都会被替换掉) */
    }).$mount()
    // 将挂载后的dom元素追加body
    document.body.appendChild(vm.$el)
    // 返回组件实例(Vue根实例下只渲染了传进来的Component这一个组件，所以是[0])
    const comp = vm.$children[0]
    comp.show()
    // 实现组件实例的remove方法(删除dom、销毁组件实例)，不过组件根元素上用的是v-if来控制显示与否，这里也不需要定义remove方法
    // comp.remove = function() {
    //     document.body.removeChild(vm.$el)
    //     vm.$destroy()
    // }
    // 组件实例返不返回随便，根据实际需求，这里其实不用返回
    return comp
}

// 通过extend创建组件自身的构造函数(区别于上面方法利用的是Vue构造函数)，再将组件实例化
function createByExtend(Component,props) {
    // 获取组件构造函数
    const Ctor = Vue.extend(Component)
    // 创建组件实例
    const comp = new Ctor({propsData: props})
    //生成dom
    comp.$mount()
    // 把dom追加到body上
    document.body.appendChild(comp.$el)
    comp.show()
    return comp
}

// 以插件的方式注册create
export default {
    install(Vue) {
        Vue.prototype.$notice = function(props) {
            return create(Notice, props)
        }
        
        Vue.prototype.$notice1 = function(props) {
            return createByExtend(Notice, props)
        }
    }
}
