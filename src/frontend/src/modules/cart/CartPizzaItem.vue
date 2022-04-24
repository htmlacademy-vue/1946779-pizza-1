<template>
   <div class="cart-list__item">
      <div class="product cart-list__product">
        <img src="@/assets/img/product.svg" class="product__img" width="56" height="56" alt="Капричоза">
        <div class="product__text">
          <h2 data-test="pizzaName">{{ pizza.pizzaName }}</h2>
          <ul>
            <li data-test="sizeOfPizza">
              {{ sizeOfPizza }}, <span class="product__ingredient-span">{{ typeOfDough }}</span> тесто.
            </li>
            <li data-test="typeOfSauce">
              Соус: {{ typeOfSauce }}.
            </li>
            <li>
              Начинка:
              <span
                class="product__ingredient-span product__ingredient-span_pseudo"
                v-for="ingredient in ingredients"
                :key="ingredient.index"
                data-test="ingredient"
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
          :counter="this.pizza.count"
          data-test="pizza-count"
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
          data-test="change-btn"
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
