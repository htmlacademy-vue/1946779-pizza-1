<template>
  <AppDrop
    data-test="drop-emit"
    @drop="$emit('drop', $event)"
  >

    <label class="input">
      <span class="visually-hidden">Название пиццы</span>

      <input
        v-model="originalNameOfPizza"
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        required
        data-test="pizzaName-input"
      >

    </label>

    <div class="content__constructor">
      <div
        class="pizza"
        :class="`pizza--foundation--${doughType}-${sauceType}`"
        data-teet="doughAndSouce-image"
      >
        <transition-group
name="ingredients"
tag="ul"
class="pizza__wrapper">
          <div
            v-for="(ingredientType, index) in dropIngredientParsed"
            :key="ingredientType.keyId"
            :data-id="index"
            class="pizza__filling"
            :class="[`pizza__filling--${ingredientType.type}`,
              {'pizza__filling--second': ingredientType.number === 2},
              {'pizza__filling--third': ingredientType.number === 3} ]"
            data-test="ingredientType"
          >
          </div>
        </transition-group>
      </div>
    </div>

  </AppDrop>
</template>
<script>
import AppDrop from '@/common/components/AppDrop';
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  name: "BuilderPizzaView",
  components: {
    AppDrop
  },

  data() {
    return {
      originalNameOfPizza: '',
    }
  },

  computed: {
    ...mapState("Builder", ['buildedPizza']),

    doughType: function() {
      return this.buildedPizza.dough.type;
    },

    sauceType: function() {
      return this.buildedPizza.sauce.type;
    },

    dropIngredientParsed: function() {
      let newArrIngredients = [];
      this.buildedPizza.ingredients.forEach( element => {
        for (let index = 1; index <= parseInt(element.counter); index++) {
          const cloneElement = Object.assign({}, element);
          cloneElement.number = index;
          cloneElement.keyId = cloneElement.id * cloneElement.number + cloneElement.type;
          newArrIngredients.unshift(cloneElement);
        }
      });

      return newArrIngredients;
    }
  },

  watch: {
    originalNameOfPizza: function(newVal) {
      this.setPizzaName(newVal);
    },
  },

  created() {
    this.originalNameOfPizza = this.buildedPizza.pizzaName;
  },

  methods: {
    ...mapMutations("Builder", {
      setPizzaName: "ADD_PIZZA_NAME"
    }),
  },
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";

.input {
  display: block;

  span {
    @include r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &:hover {
    input {
      border-color: $black;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    span {
      @include b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }
}

.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.pizza {
  position: relative;

  display: block;

  box-sizing: border-box;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--foundation--large-creamy {
    background-image: url("~@/assets/img/foundation/big-creamy.svg");
  }

  &--foundation--large-tomato {
    background-image: url("~@/assets/img/foundation/big-tomato.svg");
  }

  &--foundation--small-creamy {
    background-image: url("~@/assets/img/foundation/small-creamy.svg");
  }

  &--foundation--small-tomato {
    background-image: url("~@/assets/img/foundation/small-tomato.svg");
  }
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  position: absolute;
  top: 50%;
  left: 50%;

  display: block;

  transform: translate(-50%, -50%);

  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--second {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &--third {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &--ananas {
    background-image: url("~@/assets/img/filling-big/ananas.svg");
  }

  &--bacon {
    background-image: url("~@/assets/img/filling-big/bacon.svg");
  }

  &--blue_cheese {
    background-image: url("~@/assets/img/filling-big/blue_cheese.svg");
  }

  &--cheddar {
    background-image: url("~@/assets/img/filling-big/cheddar.svg");
  }

  &--chile {
    background-image: url("~@/assets/img/filling-big/chile.svg");
  }

  &--ham {
    background-image: url("~@/assets/img/filling-big/ham.svg");
  }

  &--jalapeno {
    background-image: url("~@/assets/img/filling-big/jalapeno.svg");
  }

  &--mozzarella {
    background-image: url("~@/assets/img/filling-big/mozzarella.svg");
  }

  &--mushrooms {
    background-image: url("~@/assets/img/filling-big/mushrooms.svg");
  }

  &--olives {
    background-image: url("~@/assets/img/filling-big/olives.svg");
  }

  &--onion {
    background-image: url("~@/assets/img/filling-big/onion.svg");
  }

  &--parmesan {
    background-image: url("~@/assets/img/filling-big/parmesan.svg");
  }

  &--salami {
    background-image: url("~@/assets/img/filling-big/salami.svg");
  }

  &--salmon {
    background-image: url("~@/assets/img/filling-big/salmon.svg");
  }

  &--tomatoes {
    background-image: url("~@/assets/img/filling-big/tomatoes.svg");
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

.ingredients-enter-active,
.ingredients-leave-active {
  transition: all 0.3s ease-in-out;
}

.ingredients-enter,
.ingredients-leave-to {
  width: 0;

  opacity: 0;
}
</style>
