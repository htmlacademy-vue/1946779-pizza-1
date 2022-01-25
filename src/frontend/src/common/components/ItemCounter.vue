<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      @click="clickCounterHandler('-')"
      type="button"
      class="counter__button counter__button--minus"
      :disabled="ingredient.counter < 1"
    >
      <span class="visually-hidden">Меньше</span>
    </button>

    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="ingredient.counter"
      disabled
      >

    <button
      @click="clickCounterHandler('+')"
      type="button"
      class="counter__button counter__button--plus"
      :disabled="ingredient.counter >= 3"
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
  methods: {
    clickCounterHandler(symbol) {
      if ( symbol === '+' ) {
        let newObjIngredient = {};
        newObjIngredient.id = this.ingredient.id;
        newObjIngredient.info = this.ingredient;
        newObjIngredient.info.counter = this.ingredient.counter + 1;

        this.$emit('moveIngredient', newObjIngredient);

      } else if ( symbol === '-' ) {
        let newObjIngredient = {};
        newObjIngredient.id = this.ingredient.id;
        newObjIngredient.info = this.ingredient;
        newObjIngredient.info.counter = this.ingredient.counter - 1;

        this.$emit('moveIngredient', newObjIngredient);
      }
    },
  },

}
</script>
