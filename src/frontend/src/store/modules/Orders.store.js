import { cloneDeep } from 'lodash';

export default {
  namespaced: true,
  state: {
    order: {},
    orders: []
  },
  mutations: {
    ADD_ORDER: (state, data) => (state.order = data),
    ADD_ORDERS: (state, data) => (state.orders = data),

    DELETE_ORDER: (state, orderId) => {
      state.orders.splice(state.orders.indexOf(state.orders.find(el => el.id === orderId)), 1);
    }
  },
  actions: {
    async query({ commit }, config) {
      const data = await this.$api.orders.query(config);
      commit('ADD_ORDERS', data)
    },

    async addOrderToState({ commit }, order) {
      const orderCopy = cloneDeep(order);
      await commit('ADD_ORDER', order);
    },

    async post({ commit }, order) {
      const orderCopy = cloneDeep(order);
      await commit('ADD_ORDER', orderCopy);
      const data = await this.$api.orders.post(orderCopy);
      return data;
    },

    async deleteOrder({ commit }, orderId) {
      const data = await this.$api.orders.delete(orderId);
      commit('DELETE_ORDER', orderId);
    },
  }
}
