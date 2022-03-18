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

        <AppButton
          class="button"
          type="button"
          @click.prevent="closePopup"
        >
          Отлично, я жду!
        </AppButton>

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
  computed: {
    ...mapState('Auth', ['isAuthenticated', 'user']),
  },
  methods: {
    ...mapMutations('Builder', {
      resetBuilderState: 'RESET_STATE'
    }),
    ...mapMutations('Cart', {
      resetCartState: 'RESET_STATE'
    }),

    async closePopup() {
      if (this.isAuthenticated == true) {
        this.resetCartState();
        this.resetBuilderState();
        await this.$store.dispatch("Builder/query");
        this.$router.push({ name: 'Orders' });
      } else {
        this.resetCartState();
        this.resetBuilderState();
        await this.$store.dispatch("Builder/query");
        this.$router.push({ name: 'Home' });
      }
    }
  },
}
</script>
