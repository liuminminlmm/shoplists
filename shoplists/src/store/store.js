import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import { httpInstance } from '@/utils/http.js';
let store = new Vuex.Store({
    state: {
        classifylist: {}
    },
    mutations: {
        updataClassifyList(state, payload) {
            let o={...state.classifylist};
           o[payload.id] = payload.res.secondLevelCategories;
           state.classifylist = o;
        }
    },
    actions: {
        getClassifyList({ state,commit }, cid) {
            if (!state.classifylist[cid]) {
                httpInstance.get(`/api/classify?cid=${cid}`).then(res => {
                    // console.log(res.secondLevelCategories);
                    commit('updataClassifyList', {
                        id: cid,
                        res: res
                    })
                })
            }
        }
    },
    getters: {},
    modules: {}
})
store.subscribe(() => {
    console.log(store.state.classifylist)
})
export default store;