import Vue from 'vue';
import Notice from '@/components/MyNotice'
// 创建dom并追加body,这里需要理清vm,comp,$el三者的关系，待阅读源码之后再回来......
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
    // 实现组件实例的remove方法(删除dom、销毁组件实例)
    comp.remove = function() {
        document.body.removeChild(vm.$el)
        vm.$destroy()
    }
    return comp
}

Vue.prototype.$notice = function(props) {
    return create(Notice, props)
}
