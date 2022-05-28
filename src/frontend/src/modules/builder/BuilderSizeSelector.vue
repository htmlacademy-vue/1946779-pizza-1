<template>
  <label
    :class="`diameter__input--${size.type}`"
    :style="{'--varSize': `url(${size.image})`}"
    class="diameter__input"
    data-test="size__label"
  >
    <input
      :value="size.name.split(' ', )[0]"
      type="radio"
      name="diameter"
      class="visually-hidden"
      :checked="size.checked"
      data-test="size__input"
      @input="sendSize"
    >
    <span>{{size.name}}</span>
  </label>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  name: "BuilderSizeSelector",
  props: {
    size: {
      type: Object,
      required: true,
      default: null
    }
  },

  created() {
    if (this.size.checked === true) {
      this.addSize(this.size);
    }
  },

  methods: {
    ...mapMutations("Builder", {
      addSize: 'ADD_SIZE'
    }),

    sendSize(event) {
      this.addSize(this.size);
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";

.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;

  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 46px;

    &::before {
      @include p_center_v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-color: $green-100;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--small {
    span::before {
      background-size: 18px;
    }
  }

  &--normal {
    span::before {
      background-size: 29px;
    }
  }

  &--big {
    span::before {
      background-size: 100%;
    }
  }

  &:hover {
    span::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + span::before {
      box-shadow: $shadow-large;
    }
  }
  span {
    &::before {
      background-image: var(--varSize);
    }
  }
}
</style>
