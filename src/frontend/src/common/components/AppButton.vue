<template>
  <button
    class="button"
    :type="type"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    type: {
      type: String,
      default: 'button'
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
