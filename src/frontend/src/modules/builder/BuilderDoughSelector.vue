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
      :checked="dough.checked"
    >
    <b>{{dough.name}}</b>
    <span>{{dough.description}}</span>

  </label>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex';

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
      this.addDough({ type: this.dough.type, price: this.dough.price });
    }
  },
  created() {
    if (this.dough.checked === true) {
      this.addDough({ type: this.dough.type, price: this.dough.price });
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
