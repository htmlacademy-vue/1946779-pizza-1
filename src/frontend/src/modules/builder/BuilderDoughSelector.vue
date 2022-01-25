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
      :data-price="dough.price"
      @input="sendDoughData"
      :checked="dough['id'] === 1"
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
  data() {
    return {
      doughTypeandPrice: {},
    }
  },
  methods: {
    sendDoughData(event) {
      this.doughTypeandPrice["type"] = event.target.value;
      this.doughTypeandPrice["price"] = event.target.getAttribute('data-price');
      this.$emit("sendDoughData", this.doughTypeandPrice);
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
