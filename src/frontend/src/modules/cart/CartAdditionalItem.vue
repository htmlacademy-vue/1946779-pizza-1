<template>
  <div class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        :src="require(`@/assets/img/${misc.svgName}.svg`)"
        width="39" height="60"
        :alt="misc.name"
      >
      <span>{{misc.name}}</span>
    </p>

    <div class="additional-list__wrapper">
      <CartItemCounter
        @sendCount="sendCount"
        :counter="counter"
      />

      <div class="additional-list__price">
        <b>× {{misc.price}} ₽</b>
      </div>
    </div>
  </div>
</template>
<script>
import CartItemCounter from '@/modules/cart/CartItemCounter';

export default {
  name: "CartAdditionalItem",
  components: {
    CartItemCounter
  },
  props: {
    misc: {
      type: Object,
    }
  },
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    sendCount(counter) {
      this.counter = counter;
    }
  },
  computed: {
    additionalCost: function() {
      return (this.counter * this.misc.price);
    }
  },
  watch: {
    additionalCost: function(newVal) {
      this.$emit("sendAllAdditionalCost", {id: this.misc.id, cost: newVal});
    }
  }
}
</script>
