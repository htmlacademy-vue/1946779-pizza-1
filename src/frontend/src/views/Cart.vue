<template>
  <form action="" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div
          class="sheet cart__empty"
          v-if="pizzasInfoArray.length < 1"
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
            @sendPizzaCost="catchPizzaCost"
          />

        </ul>

        <div class="cart__additional">
          <ul class="additional-list">

            <CartAdditionalItem
              v-for="misc in miscs"
              :key="misc.id"
              :misc="misc"
              @sendAdditionalSum="catchAdditionalSum"
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
      required: true,
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
    catchAdditionalSum(additionalSum) {
      if(!this.additionalsList.includes(this.additionalsList.find(el => additionalSum.id === el.id))) {
        this.additionalsList.push({
          id: additionalSum.id,
          price: (this.miscs.find(element => element.id === additionalSum.id).price * additionalSum.additional_sum),
        });
      } else {
        let findSomeEl = this.additionalsList.find(element => element.id === additionalSum.id);
        this.additionalsList.splice(this.additionalsList.indexOf(findSomeEl), 1);

        this.additionalsList.push({
          id: additionalSum.id,
          price: (this.miscs.find(element => element.id === additionalSum.id).price * additionalSum.additional_sum),
        });
      }
    },
    catchPizzaCost(pizzaInfo) {
      if(!this.pizzaList.includes(this.pizzaList.find(el => pizzaInfo.id === el.id))) {
        this.pizzaList.push({
          id: pizzaInfo.id,
          price: (pizzaInfo.price * pizzaInfo.pizza_sum),
        });
      } else {
        let findSomeEl = this.pizzaList.find(element => element.id === pizzaInfo.id);
        this.pizzaList.splice(this.pizzaList.indexOf(findSomeEl), 1);

        this.pizzaList.push({
          id: pizzaInfo.id,
          price: (pizzaInfo.price * pizzaInfo.pizza_sum),
        });
      }
    },
  },
  watch: {
    pizzaList: function(newVal) {
      this.allPizzasCost = 0;
      newVal.forEach(element => {
        this.allPizzasCost += element.price;
      });
    },
    additionalsList: function(newVal) {
      this.allAdditionalCost = 0,
      newVal.forEach(element => {
        this.allAdditionalCost += element.price;
      })
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
