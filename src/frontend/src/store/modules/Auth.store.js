export default {
  namespaced: true,
  state: {
    isAuthenticated: false, // для проверки, авторизован пользователь или нет
    user: null, // здесь мы будем хранить авторизованного пользователя
    address: [],
  },

  getters: {
    // геттер-функция для получения параметра по его названию из объекта user
    getUserAttribute: state => attr => state.user ? state.user[attr] : ''
  },

  mutations: {
    SET_AUTH: (state, value) => (state.isAuthenticated = value),
    SET_USER: (state, data) => (state.user = data),
    GET_ADDRESS: (state, address) => (state.address = address)
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
      dispatch('getAddress');
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
    async getAddress({ commit }) {
      const data = await this.$api.address.query();
      commit('GET_ADDRESS', data)
    }
  }
};
