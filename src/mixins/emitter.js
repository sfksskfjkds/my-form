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