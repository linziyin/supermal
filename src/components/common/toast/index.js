import Toast from './Toast'

const obj = {}

obj.install = function(Vue) {
    // console.log("执行了obj的install函数",Vue);
    // 1.创建组件构造器
    const toastContrustor = Vue.extend(Toast)

    // 2.用new方式根据组件构造器创建一个组件对象
    const toast = new toastContrustor()

    // 3.将组件对象挂载到某一个元素上
    toast.$mount(document.createElement('div'))

    // 4.toast.$el 对应的就是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = Toast;
    // console.log(this.$toast)

}

export default obj