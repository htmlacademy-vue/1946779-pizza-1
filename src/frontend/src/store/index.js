import Vue from 'vue';
import Vuex from 'vuex';
import modules from '@/store/modules';
import VuexPlugins from '@/plugins/vuexPlugins';
import { MESSAGE_LIVE_TIME } from '@/common/constants';
import { uniqueId } from 'lodash';

Vue.use(Vuex);

const state = () => ({
  notifications: [],
});


const mutations = {
  ADD_NOTIFICATION: (state, notification) => {
    state.notifications = [...state.notifications, notification];
  },
  DELETE_NOTIFICATION: (state, id) => {
    state.notifications = state.notifications.filter(
      notification => notification.id !== id
    );
  },
};

const actions = {
  async init({ dispatch }) {
    dispatch("Builder/query");
    dispatch('Cart/queryMisc');
  },
  async createNotification({ commit }, { ...notification }) {
    const uniqueNotification = {
      ...notification,
      id: uniqueId()
    };
    commit('ADD_NOTIFICATION', uniqueNotification);
    setTimeout(
      () => commit('DELETE_NOTIFICATION', uniqueNotification.id),
      MESSAGE_LIVE_TIME
    );
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [VuexPlugins],
  modules
});
