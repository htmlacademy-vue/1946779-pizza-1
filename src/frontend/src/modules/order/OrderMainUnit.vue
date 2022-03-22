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
        :key="misc.id"
        :misc="misc"
        v-show="misc.quantity > 0"
      />

    </ul>

    <p
      class="order__address"
      v-if="addresses.find(el => el.id == order.addressId)"
    >
      Адрес доставки: {{ order.orderAddress.name }}
    </p>

    <p
      class="order__address"
      v-else-if="order.addressId === null"
    >
      Адрес доставки: самовывоз.
    </p>

    <p
      class="order__address"
      v-else-if="!addresses.find(el => el.id == order.addressId)"
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
  methods: {
    ...mapActions('Orders', ['deleteOrder', 'repeatOrder']),

    removeOrder() {
      this.deleteOrder(this.order.id);
    },

    repeat() {
      this.repeatOrder(this.order);
      this.$router.push({ name: 'Cart' });
    }
  },
  computed: {
    ...mapState('Auth', ['user', 'addresses']),
    ...mapState("Builder", ['sizes', 'doughs', 'sauces', 'ingredients']),
    ...mapState("Cart", ['miscs']),
    ...mapGetters('Auth', ['isAuthenticated']),

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
  }
}
</script>
