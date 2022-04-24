<template>
  <li>
    <img
      width="20"
      height="30"
      :src="miscImage"
      :alt="miscName"
      data-test="misc-img"
    >
    <p>
      <span
      data-test="miscName-text"
      >
        {{ miscName }}
      </span>
      <b data-test="miscPrice-text">{{ miscPrice }} ₽</b>
    </p>
  </li>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'OrderAdditionalItem',
  props: {
    misc: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState("Cart", ['miscs']),

    miscName: function() {
      return this.miscs.find( el => this.misc.miscId === el.id)?.name;
    },

    miscPrice: function() {
      return this.miscs.find( el => this.misc.miscId === el.id)?.price;
    },

    miscImage: function() {
      return this.miscs.find( el => this.misc.miscId === el.id)?.image;
    }
  },
}
</script>
