<template>
  <label
    class="radio ingredients__input"
  >
    <input
      type="radio"
      name="sauce"
      :value="sauce.type"
      :data-price="sauce.price"
      :checked="sauce.checked"
      @input="sendSauceData"
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

  created() {
    if (this.sauce.checked === true) {
      this.addSauce({ type: this.sauce.type, price: this.sauce.price, id: this.sauce.id });
    }
  },

  methods: {
    ...mapMutations("Builder", {
      addSauce: "ADD_SAUCE"
    }),

    sendSauceData(event) {;
      this.addSauce({ type: this.sauce.type, price: this.sauce.price, id: this.sauce.id});

    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";

.radio {
  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 28px;

    &:before {
      @include p_center-v;

      display: block;

      box-sizing: border-box;
      width: 20px;
      height: 20px;

      content: "";
      transition: 0.3s;

      border: 1px solid $purple-400;
      border-radius: 50%;
      background-color: $white;
    }
  }

  &:hover {
    input:not(:checked):not(:disabled) + span {
      &:before {
        border-color: $purple-800;
      }
    }
  }

  input {
    display: none;

    &:checked + span {
      &:before {
        border: 6px solid $green-500;
      }
    }

    &:disabled {
      & + span {
        &:before {
          border-color: $purple-400;
          background-color: $silver-200;
        }
      }

      &:checked + span {
        &:before {
          border: 6px solid $purple-400;
        }
      }
    }
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}
</style>
