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
            v-if="isLogin"
          >

            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select
                name="test"
                class="select"
                v-model="orderWay"
                required
              >
                <option value="1">Заберу сам</option>
                <option value="2">Новый адрес</option>
                <option value="3">Существующий адрес</option>
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
                <option value="1">Заберу сам</option>
                <option value="2">Новый адрес</option>
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
                    required
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

import { parsePizzaCost } from '@/common/helpers';
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
    ...mapState('Auth', ['isLogin']),
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
    ...mapActions('Orders', ['addOrderToState']),
    ...mapMutations('Cart', {
      addOrderInfo: 'ADD_ORDERINFO'
    }),

    addOrder() {
      if (!this.phoneNumber || !this.street || !this.house || !this.apartment) {
        return;
      }

      if (this.isLogin == true) {
        let orderInfo = {
          orderWay: this.orderWay,
          phone: this.phoneNumber,
          adress: {
            street: this.street,
            house: this.house,
            apartment: this.apartment
          }
        };

        this.addOrderInfo(orderInfo);

        let orderObj = {
          userId: 1,
          pizzas: this.pizzas,
          miscs: this.miscs,
          orderInfo: this.orderInfo,
        }

        this.addOrderToState(orderObj);

        this.showPopup = !this.showPopup;
        this.$router.push({ name: 'Orders' });

      } else {
        let orderInfo = {
          orderWay: this.orderWay,
          phone: this.phoneNumber,
          adress: {
            street: this.street,
            house: this.house,
            apartment: this.apartment
          }
        };
        this.addOrderInfo(orderInfo);

        let orderObj = {
          userId: null,
          pizzas: this.pizzas,
          miscs: this.miscs,
          orderInfo: this.orderInfo,
        }
        this.addOrderToState(orderObj);

        this.showPopup = !this.showPopup;
      }
    },
  },
  created() {
    this.$store.dispatch("Cart/setAdditionals");
  }
}
</script>
