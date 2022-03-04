import user from '@/static/user.json';

export default {
  namespaced: true,
  state: {
    user: user,
    isLogin: false
  },
  mutations: {
    SET_USER: (state, user) => (state.user = user),
    CLEAR_USER: state => (state.user = {})
  },
  getters: {

  },
  actions: {
    login({ commit }, userInfo) {
      commit("SET_USER", userInfo);
    },

    logout({ commit }) {
      commit("CLEAR_USER");
    }
  }
}
