<template>
  <div class="app-layout-main">
    <AppLayoutHeader
      :price="price"
      :is-login="isLogin"
      :user="user"
    />

    <AppLayoutSidebar
      :is-active-class="isActiveClass"
    />

    <slot class="slot-class"/>
  </div>
</template>
<script>
import AppLayoutHeader from '@/layouts/AppLayoutHeader';
import AppLayoutSidebar from '@/layouts/AppLayoutSidebar';

export default {
  name: "AppLayoutProfile",
  components: {
    AppLayoutHeader,
    AppLayoutSidebar
  },

  props: {
    price: {
      type: Number,
      default: 0
    },

    isLogin: {
      type: Boolean,
      default: false
    },

    user: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      isActiveClass: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-layout-main {
    display: flex;
    flex-direction: column;
    min-width: 960px;
    min-height: 100vh;
    width: 100%;
    min-height: 100vh;
  }
  .slot-class {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
</style>
