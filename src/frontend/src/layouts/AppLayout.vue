<template>
  <transition :name="firstLoad === true ? '' : 'slide'" mode="out-in">
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
    },
    firstLoad: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
}
</script>
<style lang="scss" scoped>
.slide-enter-active, .slide-leave-active {
  position: relative;

  transition: all 0.4s linear;
}

// первоначальное состояние уходящего элемента:
.slide-leave{
  // transform: translateX(0);
  opacity: 1;
}

// конечное состояние уходящего элемента:
.slide-leave-to {
  transform: translateX(-50%);
  opacity: 0;
}

// первоначальное состояние появляющегося элемента:
.slide-enter {
  transform: translateX(50%);
  opacity: 0;
}

//  конечное состояние появляющегося элемента:
.slide-enter-to{
  transform: translateX(0);
  opacity: 1;
}

</style>
