<template>
  <div class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        :src="require(`@/assets/img/${misc.svgName}.svg`)"
        width="39" height="60"
        :alt="misc.name"
        data-test="img"
      >
      <span>{{misc.name}}</span>

    </p>

    <div class="additional-list__wrapper">

      <CartItemCounter
        @sendCount="sendCount"
        :counter="misc.initialCounter"
        data-test="misc-count"
      />

      <div class="additional-list__price">
        <b>× {{misc.price}} ₽</b>
      </div>

    </div>
  </div>
</template>
<script>
import CartItemCounter from '@/modules/cart/CartItemCounter';
import { mapActions } from 'vuex';

export default {
  name: "CartAdditionalItem",
  components: {
    CartItemCounter
  },
  props: {
    misc: {
      type: Object,
      required: true
    },
  },
  methods: {
    ...mapActions('Cart', ['addAdditional']),

    sendCount(counter) {
      this.addAdditional({ id: this.misc.id, count: counter });
    }
  }
}
</script>
