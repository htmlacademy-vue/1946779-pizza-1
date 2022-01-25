<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      @click="clickCounterHandler('-')"
      type="button"
      class="counter__button counter__button--minus"
      :disabled="this.ingredient.counter < 1"
    >
      <span class="visually-hidden">Меньше</span>
    </button>

    <input
      :data-price="ingredient.price"
      type="text"
      name="counter"
      class="counter__input"
      value="0"
      v-model="this.ingredient.counter"
      ref="inputPrice"
      disabled
      >

    <button
      @click="clickCounterHandler('+')"
      type="button"
      class="counter__button counter__button--plus"
      :disabled="this.ingredient.counter >= 3"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>
<script>
export default {
  name: "ItemCounter",
  props: {
    ingredient: {
      type: Object,
      required: true,
      default: null
    }
  },
  data() {
    return {
      price: 0,
      ingredientInfoObject: {},
    }
  },

  methods: {
    clickCounterHandler(symbol) {
      if ( symbol === '+' ) {
        this.ingredient.counter += 1;

        this.ingredientInfoObject["id"] = this.ingredient["id"];
        this.ingredientInfoObject["info"] = this.ingredient;

        this.$emit('moveIngredient', this.ingredientInfoObject);
      } else if ( symbol === '-' ) {
        this.ingredient.counter -= 1;

        this.ingredientInfoObject["id"] = this.ingredient["id"];
        this.ingredientInfoObject["info"] = this.ingredient;
        this.$emit('moveIngredient', this.ingredientInfoObject);
      }
    },
  },
}
</script>
