<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <OrderMainUnit
      v-for="order in orders"
      :key="order.id"
      :order="order"
      data-test="order-unit"
    />

  </div>
</template>
<script>
import OrderMainUnit from '@/modules/order/OrderMainUnit';
import { mapState } from 'vuex';

export default {
  name: "Orders",
  components: {
    OrderMainUnit
  },
  created() {
    this.$store.dispatch("Orders/query");
  },
  computed: {
    ...mapState("Orders", ['orders']),
  }
}
</script>
