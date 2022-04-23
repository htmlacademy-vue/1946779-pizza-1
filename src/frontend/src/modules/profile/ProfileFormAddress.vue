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
            v-model="address.name"
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
            v-model="address.street"
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
            v-model="address.building"
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
            v-model="address.flat"
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
            v-model="address.comment"
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
        @click="$emit('removeAddress', address)"
        data-test="remove-btn"
      >
        {{ buttonText }}
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
import { mapActions } from 'vuex';

export default {
  name: "ProfileFormAddress",
  props: {
    user: {
      type: Object,
      default: null
    },
    buttonText: {
      type: String,
      default: 'Удалить'
    },
    address: {
      type: Object,
      default: () => ({
        name: '',
        street: '',
        building: '',
        flat: '',
        comment: ''
      })
    },
    mode: {
      type: String,
      default: 'new'
    }
  },
  methods: {
    ...mapActions('Auth', ['postAddress', 'putAddress']),

    saveAddress() {
      if ( this.mode === 'new' ) {
        let newAddress = {
          userId: this.user.id,
          name: this.address.name,
          street: this.address.street,
          building: this.address.building,
          flat: this.address.flat,
          comment: this.address.comment
        };

        this.postAddress(newAddress);
      } else {
        this.putAddress(this.address);
      }

      this.$store.dispatch('Auth/getAddresses');

      this.address.name = '';
      this.address.street = '';
      this.address.building = '';
      this.address.flat = '';
      this.address.comment = '';

      this.$emit('closeForm', this.mode);
    }
  }
}
</script>
