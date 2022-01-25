<template>
  <label
    :class="`diameter__input--${size.type}`"
    :style="{'--varSize': `url(${size.image})`}"
    class="diameter__input"
  >
    <input
      :value="size.name.split(' ', )[0]"
      type="radio"
      name="diameter"
      class="visually-hidden"
      :checked="size.checked"
      @input="sendSize"
    >
    <span>{{size.name}}</span>
  </label>
</template>

<script>
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
    sendSize(event) {
      this.$emit("sendSize", this.size.multiplier);
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
