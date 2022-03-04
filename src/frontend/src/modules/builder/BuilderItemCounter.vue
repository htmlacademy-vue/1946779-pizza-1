<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      @click="$emit('countIngredient', counter - 1)"
      type="button"
      class="counter__button counter__button--minus"
      :disabled="counter < 1"
    >
      <span class="visually-hidden">Меньше</span>
    </button>

    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="counter"
      disabled
      >

    <button
      @click="$emit('countIngredient', counter + 1)"
      type="button"
      class="counter__button counter__button--plus"
      :disabled="counter >= 3"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>
<script>
export default {
  name: "ItemCounter",
  props: {
    counter: {
      type: Number,
      required: true,
    }
  },
}
</script>
