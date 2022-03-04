export default {
  namespaced: true,
  state: {
    order: {},
  },
  mutations: {
    ADD_ORDER: (state, data) => (state.order = data),
  },
  actions: {
    addOrderToState({ commit }, order) {
      commit('ADD_ORDER', order);
    }
  }
}
