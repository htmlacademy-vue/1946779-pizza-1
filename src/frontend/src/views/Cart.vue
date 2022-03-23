<template>
  <form @submit.prevent="addOrder" class="layout-form">
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
                @change="selectOrderMethod($event.target.value)"
              >

                <option
                  value="myself"
                >
                  Заберу сам
                </option>

                <option
                  value="new"
                >
                  Новый адрес
                </option>

                <option
                  :value="address.id"
                  v-for="address in addresses"
                  :key="address.id"
                >
                  {{ address.name }}
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

            <div
              class="cart-form__address"
              v-show="showAddressForm"
            >
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">

                <label class="input">
                  <span>Улица*</span>

                  <input
                    type="text"
                    name="street"
                    v-model="street"
                    :disabled="(orderWay !== 'new')"
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
                    :disabled="(orderWay !== 'new')"
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
                    :disabled="(orderWay !== 'new')"
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
                  value="myself"
                >
                  Заберу сам
                </option>

                <option
                  value="new"
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

            <div
              class="cart-form__address"
              v-show="showAddressForm"
            >
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">

                <label class="input">
                  <span>Улица*</span>

                  <input
                    type="text"
                    name="street"
                    v-model="street"
                    :disabled="(orderWay !== 'new')"
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
                    :disabled="(orderWay !== 'new')"
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
                    :disabled="(orderWay !== 'new')"
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
      addressForm: {},
      showPopup: false,
      orderWay: 'myself',
      phoneNumber: '',
      street: '',
      house: '',
      apartment: '',
      addressId: ''
    }
  },
  computed: {
    ...mapState('Auth', ['user', 'addresses']),
    ...mapState('Cart', ['miscs', 'pizzas', 'orderInfo']),
    ...mapGetters('Cart', ['finalPrice']),
    ...mapGetters('Auth', ['isAuthenticated']),

    showAddressForm: function() {
      if (this.orderWay === 'myself') {
        return false;
      } else {
        return true;
      }
    }
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

    selectOrderMethod(value) {
      if( value === 'myself' ) {
        return;
      }

      if( value === 'new' ) {
        this.street = '';
        this.house = '';
        this.apartment = '';

        return;
      }

      const findedAddress = this.addresses.find(el => el.id == value );

      this.street = findedAddress.street;
      this.house = findedAddress.building;
      this.apartment = findedAddress.flat;
      this.addressId = findedAddress.id;
    },

    addOrder() {
      let order;
      if ( this.isAuthenticated === true ) {

        if( this.orderWay === 'myself' ) {
          // самовывоз

          let order = {
            "userId": this.user.id,
            "phone": this.phoneNumber,
            "address": null,
            "pizzas": createPizzasRequestObj(this.pizzas),
            "misc": createMiscRequestObj(this.miscs),
          };

          this.addOrderToState(order);
          this.showPopup = !this.showPopup;
        } else if ( this.orderWay === 'new' ) {
          // новый адрес
          this.addressForm = {
            name: 'unknown',
            street: this.street,
            building: this.house,
            flat: this.apartment,
            comment: ''
          };

          order = {
            "userId": this.user.id,
            "phone": this.phoneNumber,
            "address": this.addressForm,
            "pizzas": createPizzasRequestObj(this.pizzas),
            "misc": createMiscRequestObj(this.miscs),
          };

          this.addOrderToState(order);
          this.showPopup = !this.showPopup;
        } else {
          // существующий адрес
          const addressId = { id: this.addressId }

          order = {
            "userId": this.user.id,
            "phone": this.phoneNumber,
            "address": addressId,
            "pizzas": createPizzasRequestObj(this.pizzas),
            "misc": createMiscRequestObj(this.miscs),
          };

          this.addOrderToState(order);
          this.showPopup = !this.showPopup;
        }
      } else {

        if( this.orderWay === 'myself' ) {
          // самовывоз
          order = {
            "userId": null,
            "phone": this.phoneNumber,
            "address": null,
            "pizzas": createPizzasRequestObj(this.pizzas),
            "misc": createMiscRequestObj(this.miscs),
          };

          this.addOrderToState(order);
          this.showPopup = !this.showPopup;

        } else if ( this.orderWay === 'new' ) {
          // новый адрес
          this.addressForm = {
            street: this.street,
            building: this.house,
            flat: this.apartment,
            comment: ''
          };

          order = {
            "userId": null,
            "phone": this.phoneNumber,
            "address": this.addressForm,
            "pizzas": createPizzasRequestObj(this.pizzas),
            "misc": createMiscRequestObj(this.miscs),
          };

          this.addOrderToState(order);
          this.showPopup = !this.showPopup;
        }

      }
    },
  },
  created() {
    if ( this.isAuthenticated === true ) {
      this.$store.dispatch('Auth/getAddresses');
      this.phoneNumber = this.user.phone;
    }
  }
}
</script>
