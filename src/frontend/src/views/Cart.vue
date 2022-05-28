<template>
  <form
    class="layout-form"
    @submit.prevent="addOrder"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div
          v-if="pizzas.length < 1"
          class="sheet cart__empty"
        >
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul
          v-else
          class="cart-list sheet"
        >

          <CartPizzaItem
            v-for="pizza in pizzas"
            :key="pizza.id"
            :pizza="pizza"
          />

        </ul>

        <div
          v-show="this.pizzas.length > 0"
          class="cart__additional"
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
          v-show="this.pizzas.length > 0"
          class="cart__form"
        >

          <div
            v-if="isAuthenticated"
            key="auth-order-way"
            class="cart-form"
          >

            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select
                v-model="orderWay"
                name="test"
                class="select"
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
                  v-for="address in addresses"
                  :key="address.id"
                  :value="address.id"
                >
                  {{ address.name }}
                </option>

              </select>

            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>

              <input
                v-model="phoneNumber"
                type="text"
                name="tel"
                placeholder="+7 999-999-99-99"
                required
              >

            </label>

            <div
              v-show="showAddressForm"
              class="cart-form__address"
            >
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">

                <label class="input">
                  <span>Улица*</span>

                  <input
                    v-model="street"
                    type="text"
                    name="street"
                    required
                    :disabled="(orderWay !== 'new')"
                  >

                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">

                <label class="input">
                  <span>Дом*</span>

                  <input
                    v-model="house"
                    type="number"
                    name="house"
                    required
                    :disabled="(orderWay !== 'new')"
                  >

                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">

                <label class="input">
                  <span>Квартира</span>

                  <input
                    v-model="apartment"
                    type="number"
                    name="apartment"
                    required
                    :disabled="(orderWay !== 'new')"
                  >
                </label>
              </div>
            </div>

          </div>

          <div
            v-else
            key="non-auth-order-way"
            class="cart-form"
          >

            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select
                v-model="orderWay"
                name="test"
                class="select"
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
                v-model="phoneNumber"
                type="text"
                name="tel"
                placeholder="+7 999-999-99-99"
                required
              >

            </label>

            <div
              v-show="showAddressForm"
              class="cart-form__address"
            >
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">

                <label class="input">
                  <span>Улица*</span>

                  <input
                    v-model="street"
                    type="text"
                    name="street"
                    :disabled="(orderWay !== 'new')"
                  >

                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">

                <label class="input">
                  <span>Дом*</span>

                  <input
                    v-model="house"
                    type="number"
                    name="house"
                    :disabled="(orderWay !== 'new')"
                  >

                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">

                <label class="input">
                  <span>Квартира</span>

                  <input
                    v-model="apartment"
                    type="number"
                    name="apartment"
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

    <transition name="fade">
      <Popup
        v-show="showPopup"
        :show-popup="showPopup"
      />
    </transition>

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

  created() {
    if ( this.isAuthenticated === true ) {
      this.$store.dispatch('Auth/getAddresses');
      this.phoneNumber = this.user.phone;
    }
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
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/ds-system/ds.scss";
@import "~@/assets/scss/layout/content.scss";
@import "~@/assets/scss/layout/layout.scss";

.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.cart-list {
  @include clear-list;

  padding: 15px 0;
}

.cart__title {
  margin-bottom: 15px;
}

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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
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

.cart__empty {
  padding: 20px 30px;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}

.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;

  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}

.select {
  @include r-s16-h19;

  display: block;

  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;

  cursor: pointer;
  transition: 0.3s;

  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $silver-100;
  background-image: url("~@/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;

  font-family: inherit;

  appearance: none;

  &:hover {
    border-color: $orange-100;
  }

  &:focus {
    border-color: $green-500;
  }
}

.footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba($green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include l-s11-h13;

  color: rgba($black, 0.5);
}

.footer__price {
  @include b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  button {
    padding: 16px 14px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s
}
.fade-enter, .fade-leave-to {
  transform: scale(1.1);
  opacity: 0
}
</style>
