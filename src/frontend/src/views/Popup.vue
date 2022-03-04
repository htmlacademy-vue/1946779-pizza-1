<template>
  <div class="popup-wrapper">
    <div class="popup">
      <a
        href="#"
        class="close"
        @click.prevent="closePopup"
      >
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <a
          href="#"
          class="button"
          @click.prevent="closePopup"
        >
          Отлично, я жду!
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Popup',
  props: {
    showPopup: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations('Builder', {
      resetBuilderState: 'RESET_STATE'
    }),
    ...mapMutations('Cart', {
      resetCartState: 'RESET_STATE'
    }),
    ...mapActions('Builder', ['setPizza']),

    closePopup() {
      if (this.isLogin == true) {
        this.$router.push({ name: 'Orders' });
        this.resetBuilderState();
        this.resetCartState();
      } else {
        this.$router.push({ name: 'Home' });
        this.resetBuilderState();
        this.resetCartState();
        this.setPizza();
      }
    }
  },
  computed: {
    ...mapState('Auth', ['isLogin']),
  }
}
</script>
