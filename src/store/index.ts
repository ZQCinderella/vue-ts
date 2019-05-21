import Vue from 'vue';
import Vuex from 'vuex';
import selfModule from './modules/self';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    selfModule,
  },
});
