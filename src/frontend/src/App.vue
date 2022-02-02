<template>
  <div id="app">
    <AppLayout
      :price="price"
      :isLogin="isLogin"
      :user="user"
    >
      <router-view
        :pizzasInfoArray="routeProps.pizzasInfoArray"
        :user="routeProps.user"
        @sendInfo="catchInfo"
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
      price: 0,
      isLogin: true,
    }
  },
  methods: {
    catchInfo(info) {
      this.pizzasInfoArray.push(info);
      this.$router.push({ name: 'Cart' });
    },
  },
  computed: {
     routeProps() {
      const routes = {
        Cart: { pizzasInfoArray: this.pizzasInfoArray },
        Profile: { user: this.user}
      };
      return routes[this.$route.name] || {};
    },
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
