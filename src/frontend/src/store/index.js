import Vue from 'vue';
import Vuex from 'vuex';
import modules from '@/store/modules';

Vue.use(Vuex);

const state = () => ({
  changingPizza: {}
});


const mutations = {

};

const actions = {
  async init({ dispatch }) {
    dispatch();
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules
});
