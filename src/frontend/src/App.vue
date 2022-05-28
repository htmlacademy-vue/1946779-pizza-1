<template>
  <div id="app">
    <AppLayout
      :is-login="isLogin"
      :user="user"
      :first-load="firstLoad"
    >

      <router-view
        :pizzas-info-array="routeProps.pizzasInfoArray"
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
      firstLoad: true
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

  watch: {
    $route(to, from) {
        this.firstLoad = from.name == null ? true : false
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
  },

  methods: {
    changeInitialCounter(counterAndPizzaId) {
      if (this.pizzasInfoArray.find(el =>  el.id = counterAndPizzaId.id )) {
        let findedPizza = this.pizzasInfoArray.find(el =>  el.id = counterAndPizzaId.id);
        findedPizza.initialCounter = counterAndPizzaId.counter;
      }
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
