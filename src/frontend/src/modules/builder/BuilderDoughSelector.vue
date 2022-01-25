<template>
  <label
      :class="`dough__input--${dough.type}`"
      :style="{'--varBag': `url(${dough.image})`}"
      class="dough__input"
    >
    <input
      name="dough"
      type="radio"
      class="visually-hidden"
      :value="dough.type"
      @input="sendDoughData"
      :data-price="dough.price"
      :checked="dough.checked"
    >
    <b>{{dough.name}}</b>
    <span>{{dough.description}}</span>

  </label>
</template>
<script>

export default {
  name: "BuilderDoughSelector",
  props: {
    dough: {
      type: Object,
      required: true,
    }
  },
  methods: {
    sendDoughData(event) {
      this.$emit("sendDoughData", { type: event.target.value, price: event.target.getAttribute('data-price')});
    }
  }
}
</script>

<style lang="scss" scoped>
.dough__input--small {
  b {
      &::before {
        background-image: var(--varBag);
      }
    }
}
.dough__input--large {
  b {
      &::before {
        background-image: var(--varBag);
      }
    }
}
</style>
