<template>
  <div>
    <input
      :value="sauce.type"
      :data-price="sauce.price"
      @input="sendSauceData"
      type="radio"
      name="sauce"
      :checked="sauce.checked"
    >
    <span>{{ sauce.name }}</span>
  </div>
</template>
<script>
export default {
  name: "RadioButton",
  props:{
    sauce: {
      type: Object,
      required: true,
      default: null
    }
  },
  methods: {
    sendSauceData(event) {;
      this.$emit("sendSauceData", { type: this.sauce.type, price: this.sauce.price });
    }
  }
}
</script>
