import Vue from 'vue';
import VueWait from 'vue-wait';
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.use(VueWait);

Vue.config.productionTip = false;

const loader = new Vue({
  store: new Vuex.Store({}),
  wait: new VueWait({ useVuex: true }),
});

export default loader.$wait;
