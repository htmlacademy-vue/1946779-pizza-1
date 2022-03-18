<template>
  <form action="" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div
          class="sheet cart__empty"
          v-if="pizzas.length < 1"
        >
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul
          class="cart-list sheet"
          v-else
        >

          <CartPizzaItem
            v-for="pizza in pizzas"
            :key="pizza.id"
            :pizza="pizza"
          />

        </ul>

        <div
          class="cart__additional"
          v-show="this.pizzas.length > 0"
        >
          <ul class="additional-list">

            <CartAdditionalItem
              v-for="misc in miscs"
              :key="misc.id"
              :misc="misc"
            />

          </ul>
        </div>

        <div
          class="cart__form"
          v-show="this.pizzas.length > 0"
        >

          <div
            class="cart-form"
            v-if="isAuthenticated"
          >

            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select
                name="test"
                class="select"
                v-model="orderWay"
                required
              >

                <option
                  value="1"
                >
                  Заберу сам
                </option>

                <option
                  value="2"
                >
                  Новый адрес
                </option>

                <option
                  value="3"
                >
                  Существующий адрес
                </option>

              </select>

            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>

              <input
                type="text"
                name="tel"
                placeholder="+7 999-999-99-99"
                v-model="phoneNumber"
                required
              >

            </label>

            <div class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">

                <label class="input">
                  <span>Улица*</span>

                  <input
                    type="text"
                    name="street"
                    v-model="street"
                    :disabled="(orderWay === 1)"
                    required
                  >

                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">

                <label class="input">
                  <span>Дом*</span>

                  <input
                    type="number"
                    name="house"
                    v-model="house"
                    :disabled="(orderWay === 1)"
                    required
                  >

                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">

                <label class="input">
                  <span>Квартира</span>

                  <input
                    type="number"
                    name="apartment"
                    v-model="apartment"
                    :disabled="(orderWay === 1)"
                    required
                  >
                </label>
              </div>
            </div>

          </div>

          <div
            class="cart-form"
            v-else
          >

            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select
                name="test"
                class="select"
                v-model="orderWay"
                required
              >
                <option
                  value="1"
                >
                  Заберу сам
                </option>

                <option
                  value="2"
                >
                  Новый адрес
                </option>

              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>

              <input
                type="text"
                name="tel"
                placeholder="+7 999-999-99-99"
                v-model="phoneNumber"
                required
              >

            </label>

            <div class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">

                <label class="input">
                  <span>Улица*</span>

                  <input
                    type="text"
                    name="street"
                    v-model="street"
                    :disabled="(orderWay === 1)"
                  >

                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">

                <label class="input">
                  <span>Дом*</span>

                  <input
                    type="number"
                    name="house"
                    v-model="house"
                    :disabled="(orderWay === 1)"
                  >

                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">

                <label class="input">
                  <span>Квартира</span>

                  <input
                    type="number"
                    name="apartment"
                    v-model="apartment"
                    :disabled="(orderWay === 1)"
                  >
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
        <b>Итого: {{ finalPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button
          type="submit"
          class="button"
          @click.prevent="addOrder"
          :disabled="finalPrice === 0"
        >
        Оформить заказ
        </button>
      </div>
    </section>

    <Popup
      v-show="showPopup"
      :showPopup="showPopup"
    />
  </form>
</template>
<script>
import CartPizzaItem from '@/modules/cart/CartPizzaItem';
import CartAdditionalItem from '@/modules/cart/CartAdditionalItem';

import Popup from '@/views/Popup';

import { parsePizzaCost, createPizzasRequestObj, createMiscRequestObj } from '@/common/helpers';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: "Cart",
  components: {
    CartAdditionalItem,
    CartPizzaItem,
    Popup
  },
  data() {
    return {
      showPopup: false,
      orderWay: 1,
      phoneNumber: '',
      street: '',
      house: '',
      apartment: ''
    }
  },
  computed: {
    ...mapState('Auth', ['isAuthenticated', 'user', 'address']),
    ...mapState('Cart', ['miscs', 'pizzas', 'orderInfo']),
    ...mapGetters('Cart', ['finalPrice']),
  },
  mounted() {
    if(this.pizzas) {
      this.pizzasPriceFromArray = parsePizzaCost(this.pizzas);
    } else {
      this.pizzasPriceFromArray = 0;
    }
    this.allPizzasCost = parseInt(this.pizzasPriceFromArray);
  },
  methods: {
    ...mapActions('Orders', {
      'addOrderToState': 'post'
    }),

    addOrder() {
      if (this.isAuthenticated == true) {

        if( this.orderWay === 1 ) {
          // самовывоз
          const addressForm = {
            street: '',
            building: '',
            flat: '',
            comment: 'pickup'
          };

        } else if ( this.orderWay === 2 ) {
          // новый адрес
          const addressForm = {
            street: this.street,
            building: this.house,
            flat: this.apartment,
            comment: ''
          };
        } else if ( this.orderWay === 3 ) {
          // существующий адрес
          const addressForm = {
            street: this.address.street,
            building: this.address.building,
            flat: this.address.flat,
            comment: ''
          };
        }

        let order = {
          "userId": this.user.id,
          "phone": this.phoneNumber,
          "address": this.addressForm,
          "pizzas": createPizzasRequestObj(this.pizzas),
          "misc": createMiscRequestObj(this.miscs),
        };

        this.addOrderToState(order);

        this.showPopup = !this.showPopup;
      } else {

        if( this.orderWay === 1 ) {
          // самовывоз
          const addressForm = {
            street: 'pickup',
            building: 'pickup',
            flat: 'pickup',
            comment: 'pickup'
          };

        } else if ( this.orderWay === 2 ) {
          // новый адрес
          const addressForm = {
            street: this.street,
            building: this.house,
            flat: this.apartment,
            comment: ''
          };
        }

        let order = {
          "userId": this.user.id,
          "phone": this.phoneNumber,
          "address": this.addressForm,
          "pizzas": createPizzasRequestObj(this.pizzas),
          "misc": createMiscRequestObj(this.miscs),
        };

        this.addOrderToState(orderObj);

        this.showPopup = !this.showPopup;
      }
    },
  },
}
</script>
