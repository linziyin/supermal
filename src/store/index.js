import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
    cartList:[]
}
const store = new Vuex.Store({
    state,
    // mutations唯一目的是修改state状态
    // mutations中每个方法尽可能完成的事件单一一点
    mutations,
    actions,
    getters,
})

export default store