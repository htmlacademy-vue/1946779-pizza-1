<template>
  <div id="app">
    <AppLayout
      :isLogin="isLogin"
      :user="user"
    >
      <router-view
        :pizzasInfoArray="routeProps.pizzasInfoArray"
        :user="routeProps.user"
        @changeInitialCounter="changeInitialCounter"
      />
    </AppLayout>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { setAuth } from '@/common/helpers';
import { logout } from '@/common/mixins';

export default {
  name: "App",
  mixins: [logout],
  data() {
    return {
      pizzasInfoArray: [],
      isLogin: true,
    }
  },
  methods: {
    changeInitialCounter(counterAndPizzaId) {
      if (this.pizzasInfoArray.find(el =>  el.id = counterAndPizzaId.id )) {
        let findedPizza = this.pizzasInfoArray.find(el =>  el.id = counterAndPizzaId.id);
        findedPizza.initialCounter = counterAndPizzaId.counter;
      }
    },
    async $logout() {
      // Вызываем действие логаута в хранилище.
      await this.$store.dispatch('Auth/logout');
      // Показываем уведомление об успешном выходе.
      this.$notifier.success('Вы успешно вышли');
      // Переводим пользователя на страницу логина.
      await this.$router.push('/login');
    }
  },
  computed: {
    ...mapState(['Auth']),
    ...mapGetters('Auth', ['getUserAttribute']),

    user() {
      return this.Auth.user || {};
    },

    routeProps() {
      const routes = {
        Cart: { pizzasInfoArray: this.pizzasInfoArray },
        Profile: { user: this.user}
      };
      return routes[this.$route.name] || {};
    },
  },
  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };

    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }

    this.$store.dispatch('init');
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
