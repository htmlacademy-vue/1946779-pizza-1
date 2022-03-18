<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <OrderMainUnit
      v-for="order in orders"
      :key="order.id"
      :order="order"
    />

  </div>
</template>
<script>
import OrderMainUnit from '@/modules/order/OrderMainUnit';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: "Orders",
  components: {
    OrderMainUnit
  },
  computed: {
    ...mapState("Orders", ['orders']),
  },
  created() {
    this.$store.dispatch("Orders/query");
  }
}
</script>
