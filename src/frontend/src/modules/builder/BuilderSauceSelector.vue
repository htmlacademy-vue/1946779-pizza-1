<template>
  <div>
    <input
      :value="sauce.type"
      :data-price="sauce.price"
      @input="sendSauceData"
      type="radio"
      name="sauce"
      :checked="sauce['id'] === 1"
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
  data() {
    return {
      sauceTypeandPrice: {},
    }
  },
  methods: {
    sendSauceData(event) {;
      this.sauceTypeandPrice["type"] = event.target.value;
      this.sauceTypeandPrice["price"] = event.target.getAttribute('data-price');
      this.$emit("sendSauceData", this.sauceTypeandPrice);
    }
  }
}
</script>
