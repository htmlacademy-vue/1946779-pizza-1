<template>
  <section class="sheet order">

    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ price }} ₽</span>
      </div>

      <div class="order__button">

        <button
          type="button"
          class="button button--border"
          @click="removeOrder"
        >
          Удалить
        </button>

      </div>
      <div class="order__button">

        <button
          type="button"
          class="button"
          @click="repeat"
        >
          Повторить
        </button>

      </div>
    </div>

    <ul class="order__list">

      <OrderPizzaItem
        v-for="pizza in order.orderPizzas"
        :key="pizza.id"
        :pizza="pizza"
      />

    </ul>

    <ul class="order__additional">

      <OrderAdditionalItem
        v-for="misc in order.orderMisc"
        v-show="misc.quantity > 0"
        :key="misc.id"
        :misc="misc"
      />

    </ul>

    <p
      v-if="addressFinded"
      class="order__address"
    >
      Адрес доставки: {{ order.orderAddress.name }}
    </p>

    <p
      v-else-if="order.addressId === null"
      class="order__address"
    >
      Адрес доставки: самовывоз.
    </p>

    <p
      v-else-if="!addressFinded"
      class="order__address"
    >
      Адрес доставки: улица {{  order.orderAddress.street }},
      дом {{  order.orderAddress.building }}, квартира {{  order.orderAddress.flat }}
    </p>

  </section>
</template>
<script>
import OrderPizzaItem from '@/modules/order/OrderPizzaItem';
import OrderAdditionalItem from '@/modules/order/OrderAdditionalItem';
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';

export default {
  name: 'OrderMainUnit',
  components: {
    OrderPizzaItem,
    OrderAdditionalItem
  },

  props: {
    order: {
      type: Object,
      defualt: {},
    }
  },

  computed: {
    ...mapState('Auth', ['user', 'addresses']),
    ...mapState("Builder", ['sizes', 'doughs', 'sauces', 'ingredients']),
    ...mapState("Cart", ['miscs']),
    ...mapGetters('Auth', ['isAuthenticated']),

    addressFinded: function() {
      return this.addresses.find(el => el.id == this.order.addressId);
    },

    price: function() {
      let pizzasPrice = 0;

      this.order.orderPizzas.forEach( pizza => {
        let ingredientsPriceSum = 0;

        pizza.ingredients.forEach( ingredient => {
          let price = this.ingredients.find( ing => ing.id === ingredient.ingredientId)?.price;
          let count = ingredient.quantity;
          ingredientsPriceSum += (price * count);
        });

        let pizzaPrice = ((this.sauces.find(({ id }) => pizza.sauceId === id)?.price
          + this.doughs.find(({ id }) => pizza.doughId === id)?.price
          + ingredientsPriceSum) * this.sizes.find(({ id }) => pizza.sizeId === id)?.multiplier);

        pizzasPrice += pizzaPrice;
      });

      let miscsPrice = 0;

      this.order.orderMisc.forEach( misc => {
        miscsPrice += this.miscs.find( el => misc.miscId === el.id)?.price * misc.quantity;
      })

      return (pizzasPrice + miscsPrice);
    }
  },

  methods: {
    ...mapActions('Orders', ['deleteOrder', 'repeatOrder']),

    removeOrder() {
      this.deleteOrder(this.order.id);
    },

    repeat() {
      this.repeatOrder(this.order);
      this.$router.push({ name: 'Cart' });
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/ds-system/ds.scss";
@import "~@/assets/scss/layout/content.scss";
@import "~@/assets/scss/layout/sheet.scss";

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    @include b-s14-h16;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}

.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include b-s16-h19;

  margin: 0;

  white-space: nowrap;
}

.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
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

</style>
