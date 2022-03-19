<template>
  <form
    class="address-form address-form--opened sheet"
    @submit.prevent="saveAddress"
  >

    <div class="address-form__header">
      <b>Адрес №1</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <label class="input">
          <span>Название адреса*</span>

          <input
            v-model="name"
            type="text"
            placeholder="Введите название адреса"
            required
          >

        </label>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <label class="input">
          <span>Улица*</span>

          <input
            v-model="street"
            type="text"
            placeholder="Введите название улицы"
            required
          >

        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Дом*</span>

          <input
            v-model="building"
            type="text"
            placeholder="Введите номер дома"
            required
          >

        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Квартира</span>

          <input
            v-model="flat"
            type="text"
            placeholder="Введите № квартиры"
            required
          >

        </label>
      </div>
      <div class="address-form__input">
        <label class="input">
          <span>Комментарий</span>

          <input
            v-model="comment"
            type="text"
            placeholder="Введите комментарий"
          >

        </label>
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        type="button"
        class="button button--transparent"
        @click="removeAddress"
      >
        Удалить
      </button>

      <button
        type="submit"
        class="button"
      >
        Сохранить
      </button>
    </div>

  </form>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: "ProfileFormAddress",
  props: {
    user: {
      type: Object,
      default: null
    }
  },

  data: () => ({
    name: '',
    street: '',
    building: '',
    flat: '',
    comment: ''
  }),
  methods: {
    ...mapActions('Auth', ['postAddress']),

    removeAddress() {

    },
    saveAddress() {

      let address = {
        userId: this.user.id,
        name: this.name,
        street: this.street,
        building: this.building,
        flat: this.flat,
        comment: this.comment
      };

      this.postAddress(address);
    }
  }
}
</script>
