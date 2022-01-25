<template>
  <div
    class="content__result"
  >
    <p>Итого: {{resultPrice}} ₽</p>

    <button
      type="button"
      class="button"
      :disabled="resultPrice == 0 || nameOfPizza === ''"
      @click="$emit('movePriceToCart')"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    resultPrice: {
      type: Number,
      default: 0
    },
    nameOfPizza: {
      type: String,
      default: ''
    }
  }
}
</script>
