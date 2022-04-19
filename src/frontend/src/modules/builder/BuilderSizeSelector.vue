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
      @input="sendSize"
      data-test="size__input"
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
  methods: {
    ...mapMutations("Builder", {
      addSize: 'ADD_SIZE'
    }),
    sendSize(event) {
      this.addSize(this.size);
    }
  },
  created() {
    if (this.size.checked === true) {
      this.addSize(this.size);
    }
  }
}
</script>
<style lang="scss" scoped>
.diameter__input {
  span {
    &::before {
      background-image: var(--varSize);
    }
  }
}
</style>
