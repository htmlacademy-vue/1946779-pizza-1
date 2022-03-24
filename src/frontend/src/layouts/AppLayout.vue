<template>
  <transition name="slide" mode="out-in" appear>
    <component
      :is="layout"
      :price="price"
      :isLogin="isLogin"
      :user="user"
    >

      <slot />
    </component>
  </transition>
</template>

<script>
const defaultLayout = 'AppLayoutDefault';

export default {
  name: 'AppLayout',
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
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },

  }
}
</script>
<style lang="scss" scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease-out;
}

.slide-enter-to{
  position: relative;
  left: 0;
}

.slide-leave{
  position: absolute;
}

.slide-enter {
  left: -100vw;
  position: absolute;
  opacity: 0.5;
}

.slide-leave-to {
  right: -100vw;
  opacity: 0;
}
</style>
