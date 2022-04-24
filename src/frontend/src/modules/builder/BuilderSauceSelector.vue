<template>
  <label
    class="radio ingredients__input"
    data-test="sauce-label"
  >
    <input
      :value="sauce.type"
      :data-price="sauce.price"
      @input="sendSauceData"
      type="radio"
      name="sauce"
      :checked="sauce.checked"
    >
    <span>{{ sauce.name }}</span>
  </label>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  name: "BuilderSauceSelector",
  props:{
    sauce: {
      type: Object,
      required: true,
      default: null
    }
  },
  methods: {
    ...mapMutations("Builder", {
      addSauce: "ADD_SAUCE"
    }),

    sendSauceData(event) {
      this.addSauce({ type: this.sauce.type, price: this.sauce.price, id: this.sauce.id});
    }
  },
  created() {
    if (this.sauce.checked === true) {
      this.addSauce({ type: this.sauce.type, price: this.sauce.price, id: this.sauce.id });
    }
  }
}
</script>
