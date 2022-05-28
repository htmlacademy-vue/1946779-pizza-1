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
      :checked="dough.checked"
      data-test="dough__input"
      @input="sendDoughData"
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

  created() {
    if (this.dough.checked === true) {
      this.addDough({ type: this.dough.type, price: this.dough.price, id: this.dough.id });
    }
  },

  methods: {
    ...mapMutations("Builder", {
      addDough: "ADD_DOUGH"
    }),

    sendDoughData(event) {
      this.addDough({ type: this.dough.type, price: this.dough.price, id: this.dough.id });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";

.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-color: #ffffff;
      }
    }
  }

  &--large {
    b {
      &::before {
        background-color: #ffffff;
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}

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
