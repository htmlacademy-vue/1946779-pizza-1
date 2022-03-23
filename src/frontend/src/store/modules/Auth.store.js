import { cloneDeep } from 'lodash';

export default {
  namespaced: true,
  state: {
    user: null, // здесь мы будем хранить авторизованного пользователя
    addresses: [],
  },

  getters: {
    // геттер-функция для получения параметра по его названию из объекта user
    getUserAttribute: state => attr => state.user ? state.user[attr] : '',

    isAuthenticated: state => state.user ? true : false
  },

  mutations: {
    SET_AUTH: (state, value) => (state.isAuthenticated = value),
    SET_USER: (state, data) => (state.user = data),
    GET_ADDRESS: (state, addresses) => (state.addresses = addresses),
    DELETE_ADDRESS: (state, addressId) => {
      state.addresses.splice(state.addresses.indexOf(state.addresses.find(el => el.id === addressId)), 1);
    }
  },

  actions: {
    // во время успешного логина:
    async login({ commit, dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      // 1. получаем с сервера токен и сохраняем его в LocalStorage
      this.$jwt.saveToken(data.token);
      // 2. Добавляем заголовок авторизации в axios
      this.$api.auth.setAuthHeader();
      // 3. Отправляем запрос на получение профиля пользователя
      dispatch('getMe');
      dispatch('getAddresses');
     },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit( 'SET_AUTH', false );
      commit( 'SET_USER', null );
    },

    // Получаем данные авторизованного пользователя
    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit( 'SET_AUTH', true );
        commit( 'SET_USER', data );
      } catch {
        // Если токен авторизации  невалиден, или мы не смогли получить
        // данные пользователя по другой причине, делаем логаут без запроса на логаут на сервер.
        dispatch('logout', false);
      }
    },

    async getAddresses({ commit }) {
      const data = await this.$api.address.query();
      commit('GET_ADDRESS', data)
    },

    async postAddress({ commit }, address) {
      const addressCopy = cloneDeep(address);
      const data = await this.$api.address.post(addressCopy);
      return data;
    },

    async putAddress({ commit }, address) {
      const data = await this.$api.address.put(address);
    },

    async deleteAddress({ commit }, addressId) {
      const data = await this.$api.address.delete(addressId);
      commit('DELETE_ADDRESS', addressId);
    }
  }
};
