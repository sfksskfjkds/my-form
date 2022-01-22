let Vue;
// 实现my-vue-router插件，挂载$router

class MyVueRouter {
    constructor(options) {
        this.$options = options
        // 创建响应式的current属性，current变化让router-view的render函数(用到了current)自动执行
        // Vue.util.defineReactive(this,'current','')
        // router实例化时监听hashchange事件,bind防止onhashchange函数上下文为window
        window.addEventListener('hashchange', this.onhashchange.bind(this))
        // 还要监听用户刷新后的load事件
        window.addEventListener('load', this.onhashchange.bind(this))
        this.current = window.location.hash.slice(1)
        Vue.util.defineReactive(this,'matched',[])
        this.getMatched()

    }
    onhashchange() {
        this.current = window.location.hash.slice(1)
        this.matched = []
        this.getMatched()
    }

    getMatched(routes) {
        const router = this
        routes = routes || router.$options.routes
        routes.forEach(route => {
            if (route.path === '/' && router.current === '/') {
                router.matched.push(route)
                return
            }
            if (route.path !== '/' && router.current.indexOf(route.path) > -1) {
                router.matched.push(route)
            }
            if (route.children) {
                router.getMatched(route.children)
            }
        })
    }
}

MyVueRouter.install = function(_Vue) {
    // 保存Vue构造函数
    Vue = _Vue;
    /* 
        挂载$router以供所有Vue实例访问router实例
            1.获取Vue根实例中的router选项(全局混入一个生命周期或方法，拿到组件实例)
            2.拿到Vue根实例上挂载的router实例后添加到Vue的原型上
        注：有个很奇怪的问题就是为什么不在new Vue()时配置对象里面声明一个生命周期钩子(比如beforeCreate),
            在里面把router实例添加到Vue原型上，亲测有效，.....待日后验证
    */
   Vue.mixin({
       beforeCreate() {
           // 如果组件实例的配置中有router选项，则说明该实例是vue根实例(new Vue时传入)
           if (this.$options.router) {
                // 把router挂载到Vue原型上
                Vue.prototype.$router = this.$options.router
           }
       }
   })

    //    实现全局组件router-link
    Vue.component('router-link', {
        // 希望渲染：<a href="/">Home</a>
        props: {
            // 接收用户传入的to属性
            to: {
                type: String,
                required: true
            }
        },
        // 这里不能用template选项，只能用render函数，run-time-only环境下没有编译器(通过webpack预编译)
        render(h) {
            // h(tagName:String,data:Object,children:Array)
            return h('a',{
                attrs: {
                    href: `#${ this.to }`
                }
                // this.$slots.default正好时孩子节点组成的数组
            },this.$slots.default)
            /* vue-cli搭建的webpack环境默认集成了jsx语法
            return <a href={`#${this.to}`}>{ this.$slots.default }</a> */
        }
    })

    // 实现全局组件router-view
    Vue.component('router-view', {
        render(h) {
            this.$vnode.data.routerView = true
            let depth = 0
            let parent = this.$parent 
            while (parent) {
                let vnodeData = parent.$vnode && parent.$vnode.data
                if (vnodeData && vnodeData.routerView) {
                    depth ++
                }
                parent = parent.$parent
            }
            // 获取当前router-view层级与路由表中对应的组件
            let Component = this.$router.matched[depth].component
            // 遍历路由表(实例化路由时传入的routes选项)
            // this.$router1.$options.routes.forEach(route => {
            //     if (route.path === this.$router1.current) {
            //         /* 路由表中的path路径与路由实例的current属性匹配，则切换路由渲染 */
            //         Component = route.component
            //     }
            // })
            return h(Component)
        }
    })
}
export default MyVueRouter