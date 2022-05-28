<template>
   <div class="cart-list__item">
      <div class="product cart-list__product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          alt="Капричоза"
        >
        <div class="product__text">
          <h2>{{ pizza.pizzaName }}</h2>
          <ul>
            <li>
              {{ sizeOfPizza }}, <span class="product__ingredient-span">{{ typeOfDough }}</span> тесто.
            </li>
            <li>
              Соус: {{ typeOfSauce }}.
            </li>
            <li>
              Начинка:
              <span
                v-for="ingredient in ingredients"
                :key="ingredient.index"
                class="product__ingredient-span product__ingredient-span_pseudo"
              >
                {{ ingredient }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="counter cart-list__counter">

        <CartItemCounter
          :counter="this.pizza.count"
          @sendCount="catchCounter"
        />
      </div>

      <div class="cart-list__price">
        <b>{{ this.pizza.count * this.pizza.price }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          class="cart-list__edit"
          @click="changeIngredients"
        >
        Изменить</button>
      </div>
    </div>
</template>
<script>
import CartItemCounter from '@/modules/cart/CartItemCounter';
import { dough_types, pizza_sizes, pizza_sauces } from "@/common/constants";
import { parsePizzaInfo } from "@/common/helpers";
import { mapActions } from 'vuex';

export default {
  name: "CartPizzaItem",
  components: {
    CartItemCounter
  },

  props: {
    pizza: {
      type: Object,
      required: true
    },
  },

  computed: {
    sizeOfPizza: function() {
      return pizza_sizes.find(({ label }) => this.pizza.size.multiplier === label)?.size;
    },

    typeOfDough: function() {
      return  dough_types.find(({ value }) => this.pizza.dough.type === value)?.label;
    },

    typeOfSauce: function() {
      return pizza_sauces.find(({ value }) => this.pizza.sauce.type === value)?.rus_label;
    },

    ingredients: function() {
      return parsePizzaInfo(this.pizza.ingredients);
    }
  },

  methods: {
    ...mapActions('Cart', ['addPizzaCount']),
    ...mapActions('Builder', ['setChangingPizza']),

    catchCounter(counter) {
      this.addPizzaCount({id: this.pizza.id, count: counter, price: this.pizza.price});
    },

    async changeIngredients() {
      const copyPizza = Object.assign({}, this.pizza);
      this.setChangingPizza(copyPizza);
      this.$router.push({ name: 'Home' });
    }
  },
 }
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/ds-system/ds.scss";

.cart-list__item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;

    border-bottom: none;
  }
}

.cart-list__product {
  flex-grow: 1;

  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;

  text-align: right;

  b {
    @include b-s16-h19;
  }
}

.cart-list__edit {
  @include l-s11-h13;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    color: $green-500;
  }

  &:active {
    color: $green-600;
  }

  &:focus {
    color: $green-400;
  }
}

.counter {
  display: flex;

  justify-content: space-between;
  align-items: center;
}

.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}

.product__ingredient-span {
  text-transform: lowercase;
}

.product__ingredient-span_pseudo {
  &::after {
    content: ", ";
  }

  &:last-child::after {
    content: ".";
  }
}
</style>
