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
import user from '@/static/user';

export default {
  name: "App",
  data() {
    return {
      user: user,
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
    }
  },
  computed: {
     routeProps() {
      const routes = {
        Cart: { pizzasInfoArray: this.pizzasInfoArray },
        Profile: { user: this.user}
      };
      return routes[this.$route.name] || {};
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
