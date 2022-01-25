<template>
  <div
    class="content__result"
  >
    <p>Итого: {{resultPrice}} ₽</p>

    <button
      type="button"
      class="button"
      :disabled="resultPrice == 0 || originalNameOfPizza === ''"
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
    originalNameOfPizza: {
      type: String,
      default: ''
    }
  }
}
</script>
