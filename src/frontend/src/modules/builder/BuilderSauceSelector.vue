<template>
  <label
    class="radio ingredients__input"
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
  name: "RadioButton",
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

    sendSauceData(event) {;
      this.addSauce({ type: this.sauce.type, price: this.sauce.price });

    }
  },
  created() {
    if (this.sauce.checked === true) {
      this.addSauce({ type: this.sauce.type, price: this.sauce.price });
    }
  }
}
</script>
