<template>
  <label
    :class="`diameter__input--${size.type}`"
    :style="{'--varSize': `url(${size.image})`}"
    class="diameter__input"
  >
    <input
      :value="size.name.split(' ', )[0]"
      :data-multiplier="size.multiplier"
      type="radio"
      name="diameter"
      class="visually-hidden"
      :checked="size['id'] == 1"
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
  data() {
    return {
      sizeMultiplier: '',
    }
  },
  methods: {
    sendSize(event) {
      this.sizeMultiplier = event.target.getAttribute('data-multiplier');
      this.$emit("sendSize", this.sizeMultiplier);
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
