import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './acitons';

Vue.use(Vuex);

const state = {
    inAuthenticated: false,
    user: null,
    openId: '',
    lessonInfo: null
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})