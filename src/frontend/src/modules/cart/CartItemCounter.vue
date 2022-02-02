<template>
  <div class="counter additional-list__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="clickCounter('-')"
      :disabled="counterInside < 1"
    >
      <span class="visually-hidden">Меньше</span>
    </button>

    <input
      type="text"
      name="counter"
      class="counter__input"
      v-model="counterInside"
      disabled
    >

    <button
      type="button"
      class="counter__button counter__button--plus counter__button--orange"
      @click="clickCounter('+')"
      :disabled="counterInside >= 3"
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
    }
  },
  data() {
    return {
      counterInside: this.counter,
    }
  },
  methods: {
     clickCounter(symbol) {
      if ( symbol === '+' ) {
        this.counterInside += 1;
        this.$emit("sendCount", this.counterInside)
      } else if ( symbol === '-' ) {
        this.counterInside -= 1;
        this.$emit("sendCount", this.counterInside)
      }
    },
  },

}
</script>
