<template>
  <section class="sheet order">

    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #11199929</b>
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
        <button type="button" class="button">Повторить</button>
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

    <p class="order__address">Адрес доставки: Тест (или если адрес новый - писать целиком)</p>
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
    ...mapActions('Orders', ['deleteOrder']),

    removeOrder() {
      this.deleteOrder(this.order.id);
    },
  },
  computed: {
    ...mapState("Builder", ['sizes', 'doughs', 'sauces', 'ingredients']),
    ...mapState("Cart", ['miscs']),

    price: function() {
      let pizzasPrice = 0;

      this.order.orderPizzas.forEach( pizza => {
        let ingredientsPriceSum = 0;

        pizza.ingredients.forEach( ingredient => {
          let price = this.ingredients.find( ing => ing.id === ingredient.ingredientId)?.price;
          let count = ingredient.quantity;
          ingredientsPriceSum += parseInt(price * count);
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
