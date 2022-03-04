<template>
  <div
    class="content__result"
  >
    <p>Итого: {{ pricePizza }} ₽</p>

    <button
      type="button"
      class="button"
      :disabled=" (buildedPizza.ingredients.length < 1) || (buildedPizza.pizzaName === '') "
      @click="putPizza"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex';

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapGetters("Builder", ["pricePizza"]),
    ...mapState("Builder", ['buildedPizza']),
  },
  methods: {
    ...mapMutations("Cart", {
      setPizza: 'SET_PIZZA'
    }),
    ...mapMutations("Builder", {
      addPrice: 'ADD_PRICE',
      resetState: 'RESET_STATE'
    }),

    putPizza() {
      this.addPrice(this.pricePizza);
      this.setPizza(this.buildedPizza);
      this.resetState();
      this.$router.push({ name: 'Cart' });
    }
  }
}
</script>
