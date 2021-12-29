import Vue from 'vue';
import Notice from '@/components/MyNotice'
/* 创建dom并追加body,这里需要理清vm,comp,$el三者的关系，
vm: Vue根实例，挂载后变成真实DOM会替换#app
comp：

待阅读源码之后再回来验证......  */
function create(Component, props) {
    const vm = new Vue({
        // h是createElement,返回的是虚拟DOM，通过挂载变成真实DOM
        render: h => h(Component, { props })
        /* $mount函数不指定宿主元素不会进行dom的追加操作($mount函数不能直接指定body,
            指定body的话整个body都会被替换掉)，但还是会创建真实的dom */
    }).$mount()
    // 把生成的dom元素追加body
    document.body.appendChild(vm.$el)
    // 返回组件实例，创建的vue实例子组件的第一个元素(Component实例)
    const comp = vm.$children[0]
    // 实现组件实例的remove方法(删除dom、销毁组件实例)，不过组件根元素上用的是v-if来控制显示与否，这里也不需要定义remove方法
    // comp.remove = function() {
    //     document.body.removeChild(vm.$el)
    //     vm.$destroy()
    // }
    return comp
}

function createByExtend(Component,props) {
    // 获取组件构造函数
    const Ctor = Vue.extend(Component)
    // 创建组件实例
    const comp = new Ctor({propsData: props})
    //生成dom
    comp.$mount()
    // 把dom追加到body上
    document.body.appendChild(comp.$el)
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
