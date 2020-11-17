import Vue from 'vue';
import VueWait from 'vue-wait';
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.use(VueWait);

Vue.config.productionTip = false;

const vue = new Vue({});

export const emit = vue.$emit;
export const on = vue.$on;
