import Vue from 'vue';
import Vuex from 'vuex';
import modules from '@/store/modules';

Vue.use(Vuex);

const state = () => ({
  buildedPizzas: []
});

const actions = {
  async init({ dispatch }) {
    dispatch();
  },
  putPizzaToCart({ state, rootState, commit }) {
    const pizza = rootState.buildedPizza;
    commit('ADD_PIZZA', pizza);
  },
};

const mutations = {
  ADD_PIZZA: (state, data) => (state.buildedPizzas.push(data)),
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules
});
