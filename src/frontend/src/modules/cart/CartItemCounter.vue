<template>
  <div class="counter additional-list__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="$emit('sendCount', counter - 1)"
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
      type="button"
      class="counter__button counter__button--plus counter__button--orange"
      @click="$emit('sendCount', counter + 1)"
      :disabled="counter >= 3"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>
<script>


export default {
  name: "CartItemCounter",
  props: {
    counter: {
      type: Number,
      required: true,
    }
  },
}
</script>
