<template>
  <li>
    <img
      :src="require(`@/assets/img/${miscSvg}.svg`)"
      width="20"
      height="30"
      :alt="miscName"
    >
    <p>
      <span>{{ miscName }}</span>
      <b>{{ miscPrice }} ₽</b>
    </p>
  </li>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';

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

    miscSvg: function() {
      return this.miscs.find( el => this.misc.miscId === el.id)?.svgName;
    }
  },
}
</script>
