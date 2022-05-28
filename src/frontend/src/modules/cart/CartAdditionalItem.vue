<template>
  <div class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        :src="require(`@/assets/img/${misc.svgName}.svg`)"
        width="39"
        height="60"
        :alt="misc.name"
        data-test="img"
      >
      <span>{{misc.name}}</span>

    </p>

    <div class="additional-list__wrapper">

      <CartItemCounter
        :counter="misc.initialCounter"
        data-test="misc-count"
        @sendCount="sendCount"
      />

      <div class="additional-list__price">
        <b>× {{misc.price}} ₽</b>
      </div>

    </div>
  </div>
</template>
<script>
import CartItemCounter from '@/modules/cart/CartItemCounter';
import { mapActions } from 'vuex';

export default {
  name: "CartAdditionalItem",
  components: {
    CartItemCounter
  },

  props: {
    misc: {
      type: Object,
      required: true
    },
  },

  methods: {
    ...mapActions('Cart', ['addAdditional']),

    sendCount(counter) {
      this.addAdditional({ id: this.misc.id, count: counter });
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__price {
  @include b-s16-h19;
}

</style>
