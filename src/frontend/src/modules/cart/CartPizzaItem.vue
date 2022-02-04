<template>
   <div class="cart-list__item">
      <div class="product cart-list__product">
        <img src="@/assets/img/product.svg" class="product__img" width="56" height="56" alt="Капричоза">
        <div class="product__text">
          <h2>{{ pizza.pizza_name }}</h2>
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
                class="product__ingredient-span product__ingredient-span_pseudo"
                v-for="ingredient in ingredients"
                :key="ingredient.index"
              >
                {{ ingredient }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="counter cart-list__counter">

        <CartItemCounter
          @sendCount="catchCounter"
          :counter="counter"
        />
      </div>

      <div class="cart-list__price">
        <b>{{ allPizzasCost }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button type="button" class="cart-list__edit">Изменить</button>
      </div>
    </div>
</template>
<script>
import CartItemCounter from '@/modules/cart/CartItemCounter';
import { dough_types, pizza_sizes, pizza_sauces, pizza_ingredients, misc_types } from "@/common/constants";
import { parsePizzaInfo } from "@/common/helpers";

export default {
  name: "CartPizzaItem",
  components: {
    CartItemCounter
  },
  props: {
    pizza: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      sizeOfPizza: pizza_sizes.find(({ label }) => this.pizza.pizza_size === label)?.size,
      typeOfDough: dough_types.find(({ value }) => this.pizza.pizza_dough === value)?.label,
      typeOfSauce: pizza_sauces.find(({ value }) => this.pizza.pizza_sauce === value)?.rus_label,
      ingredients: parsePizzaInfo(this.pizza.pizza_ingredients),
      counter: 1,
    }
  },
  methods: {
    catchCounter(counter) {
      this.counter = counter;
      this.$emit("sendPizzaCost", {id: this.pizza.id_pizza, pizza_sum: counter, price: this.pizza.pizza_price})
    }
  },
  computed: {
    allPizzasCost: function() {
      return (this.counter * this.pizza.pizza_price);
    }
  }
 }
</script>
<style lang="scss" scoped>
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
