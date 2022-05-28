<template>
  <main class="content">
    <form
      action="#"
      method="post"
    >
      <div class="content__wrapper">

        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">

          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">

              <BuilderDoughSelector
                v-for="dough in doughs"
                :key="dough.id"
                :dough="dough"
              />

            </div>

          </div>

        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <BuilderSizeSelector
                v-for="size in sizes"
                :key="size.id"
                :size="size"
              />

            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

            <div class="sheet__content ingredients">

              <BuilderIngredientsSelector

              />

            </div>
          </div>
        </div>

        <div class="content__pizza">

          <BuilderPizzaView
            @drop="dropIngr($event)"
          />

          <div
            class="content__result"
          >
            <p>Итого: {{ pricePizza }} ₽</p>

            <button
              type="button"
              class="button"
              :disabled="disabledButton"
              @click="putPizza"
            >
              Готовьте!
            </button>
          </div>
        </div>

      </div>

    </form>
  </main>
</template>
<script>
import BuilderDoughSelector from '@/modules/builder/BuilderDoughSelector';
import BuilderSizeSelector from '@/modules/builder/BuilderSizeSelector';
import BuilderIngredientsSelector from '@/modules/builder/BuilderIngredientsSelector';
import BuilderPizzaView from '@/modules/builder/BuilderPizzaView';

import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';

export default {
  name: "IndexHome",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },

  computed: {
    ...mapGetters("Builder", ["pricePizza"]),
    ...mapState("Builder", ['buildedPizza', 'sizes', 'doughs']),

    disabledButton: function () {
      let ingCount = 0;
      this.buildedPizza.ingredients.forEach( ingredient => ingCount += ingredient.counter);
      return ( (ingCount < 1) || (this.buildedPizza.pizzaName === '') );
    }
  },

  methods: {
    ...mapActions("Builder", ["addIngredients", 'query', "dropIngredients"]),

    ...mapMutations("Cart", {
      setPizza: 'SET_PIZZA'
    }),

    ...mapMutations("Builder", {
      addPrice: 'ADD_PRICE',
      resetState: 'RESET_STATE'
    }),

    dropIngr(ingredient) {
      this.dropIngredients(ingredient);
    },

    inputNameOfPizza(inputValue) {
      this.nameOfPizza = inputValue;
    },

    movePriceToCart() {
      this.$emit('sendInfo', infoAboutPizza);
    },

    putPizza() {
      this.addPrice(this.pricePizza);
      this.setPizza(Object.assign( {}, this.buildedPizza));
      this.resetState();
      this.query();
      this.$router.push({ name: 'Cart' });
    }
  },
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/ds-system/ds.scss";
@import "~@/assets/scss/layout/content.scss";
@import "~@/assets/scss/layout/sheet.scss";

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--big {
    @include b-s36-h42;
  }

  &--small {
    @include b-s18-h21;
  }
}

.button {
  $bl: &;

  @include b-s18-h21;
  font-family: inherit;
  display: block;

  box-sizing: border-box;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  color: $white;
  border: none;
  border-radius: 8px;
  outline: none;
  box-shadow: $shadow-medium;

  background-color: $green-500;

  &:hover:not(:active):not(:disabled) {
    background-color: $green-400;
  }

  &:active:not(:disabled) {
    background-color: $green-600;
  }

  &:focus:not(:disabled) {
    opacity: 0.5;
  }

  &:disabled {
    background-color: $green-300;
    color: rgba($white, 0.2);
    cursor: default;
  }

  &--border {
    background-color: transparent;
    border: 1px solid $green-500;
    color: $black;
    box-shadow: none;

    &:hover:not(:active):not(:disabled) {
      color: $green-500;
      border-color: $green-500;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: $green-600;
      border-color: $green-600;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.5;
    }
  }

  &--transparent {
    @include b-s14-h16;
    background-color: transparent;
    box-shadow: none;
    color: $black;

    &:hover:not(:active):not(:disabled) {
      color: $red-800;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: $red-900;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.25;
    }
  }

  &--arrow {
    &::before {
      content: "";
      background-image: url("~@/assets/img/button-arrow.svg");
      background-position: center;
      background-repeat: no-repeat;
      margin-right: 16px;
      width: 18px;
      height: 18px;
      display: inline-block;
      vertical-align: middle;
      transform: translateY(-1px);
    }
  }

  &--white {
    background-color: $white;
    color: $green-500;
  }
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
