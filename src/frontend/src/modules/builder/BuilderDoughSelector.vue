<template>
  <label
      :class="`dough__input--${dough.type}`"
      :style="{'--varBag': `url(${dough.image})`}"
      class="dough__input"
      data-test="dough__label"
    >
    <input
      name="dough"
      type="radio"
      class="visually-hidden"
      :value="dough.type"
      @input="sendDoughData"
      :checked="dough.checked"
      data-test="dough__input"
    >
    <b>{{dough.name}}</b>
    <span>{{dough.description}}</span>

  </label>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  name: "BuilderDoughSelector",
  props: {
    dough: {
      type: Object,
      required: true,
    }
  },
  methods: {
    ...mapMutations("Builder", {
      addDough: "ADD_DOUGH"
    }),

    sendDoughData(event) {
      this.addDough({ type: this.dough.type, price: this.dough.price, id: this.dough.id });
    }
  },
  created() {
    if (this.dough.checked === true) {
      this.addDough({ type: this.dough.type, price: this.dough.price, id: this.dough.id });
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
