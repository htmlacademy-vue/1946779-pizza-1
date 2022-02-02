<template>
  <form action="" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div
          class="sheet cart__empty"
          v-if="pizzasInfoArray && (pizzasInfoArray.length < 1)"
        >
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul
          class="cart-list sheet"
          v-else
        >

          <CartPizzaItem
            v-for="pizza in pizzasInfoArray"
            :key="pizza.id"
            :pizza="pizza"
            :pizzaPrice="pizza.pizza_price"
            @sendPizzaCost="catchPizzaCost"
          />

        </ul>

        <div class="cart__additional">
          <ul class="additional-list">

            <CartAdditionalItem
              v-for="misc in miscs"
              :key="misc.id"
              :misc="misc"
              @sendAllAdditionalCost="catchAllAdditionalCost"
            />

          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">

            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select name="test" class="select">
                <option value="1">Заберу сам</option>
                <option value="2">Новый адрес</option>
                <option value="3">Дом</option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input type="text" name="tel" placeholder="+7 999-999-99-99">
            </label>

            <div class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input type="text" name="street">
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input type="text" name="house">
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input type="text" name="apartment">
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">

        <router-link
          to="/"
          class="button button--border button--arrow"
        >
          Хочу еще одну
        </router-link>

      </div>
      <p class="footer__text">Перейти к конструктору<br>чтоб собрать ещё одну пиццу</p>
      <div class="footer__price">
        <b>Итого: {{ finalCostOfProducts }} ₽</b>
      </div>

      <div class="footer__submit">
        <button
          type="submit"
          class="button"
          @click.prevent="checkout"
        >
        Оформить заказ
        </button>
      </div>
    </section>

    <Popup
      v-show="showPopup"
      @closePopup="closePopup"
    />
  </form>
</template>
<script>
import CartPizzaItem from '@/modules/cart/CartPizzaItem';
import CartAdditionalItem from '@/modules/cart/CartAdditionalItem';

import Popup from '@/views/Popup';

import misc from '@/static/misc';
import { normalizeMisc, parsePizzaCost } from '@/common/helpers';

export default {
  name: "Cart",
  components: {
    CartAdditionalItem,
    CartPizzaItem,
    Popup
  },
  props: {
    pizzasInfoArray: {
      type: Array,
    }
  },
  data() {
    return {
      showPopup: false,
      miscs: misc.map(item => normalizeMisc(item)),
      pizzasPriceFromArray: 0,
      additionalsList: [],
      allAdditionalCost: 0,
      pizzaList: [],
      allPizzasCost: 0,
    }
  },
  methods: {
    checkout() {
      this.showPopup = !this.showPopup;
    },
    closePopup() {
      this.showPopup = !this.showPopup;
    },
    catchAllAdditionalCost(additionalCost) {
      if (this.additionalsList.find( elem => additionalCost.id === elem.id )) {
        let findSomeElem = this.additionalsList.find( elem => additionalCost.id === elem.id );
        this.additionalsList.splice(this.additionalsList.indexOf(findSomeElem), 1);
        this.additionalsList.push(additionalCost);
      } else {
        this.additionalsList.push(additionalCost);
      }
    },
    catchPizzaCost(pizzaCost) {
      if (this.pizzaList.find( elem => pizzaCost.id === elem.id )) {
        let findSomeElem = this.pizzaList.find( elem => pizzaCost.id === elem.id );
        this.pizzaList.splice(this.pizzaList.indexOf(findSomeElem), 1);
        this.pizzaList.push(pizzaCost);
      } else {
        this.pizzaList.push(pizzaCost);
      }
    }
  },
  watch: {
    additionalsList: function(newVal) {
      this.allAdditionalCost = 0;
      newVal.forEach(element => {
        this.allAdditionalCost += element.cost;
      });
    },
    pizzaList: function(newVal) {
      this.allPizzasCost = 0;
      newVal.forEach(element => {
        this.allPizzasCost += element.cost;
      });
    }
  },
  computed: {
    finalCostOfProducts: function() {
      return (this.allAdditionalCost + this.allPizzasCost);
    }
  },
  mounted() {
    if(this.pizzasInfoArray) {
      this.pizzasPriceFromArray = parsePizzaCost(this.pizzasInfoArray);
    } else {
      this.pizzasPriceFromArray = 0;
    }
    this.allPizzasCost = parseInt(this.pizzasPriceFromArray);
  }
}
</script>
