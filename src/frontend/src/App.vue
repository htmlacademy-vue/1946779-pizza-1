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

export default {
  name: "App",
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
