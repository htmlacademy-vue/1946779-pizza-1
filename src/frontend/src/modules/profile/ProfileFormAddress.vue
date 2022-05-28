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
            v-model="cloneAddress.name"
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
            v-model="cloneAddress.street"
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
            v-model="cloneAddress.building"
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
            v-model="cloneAddress.flat"
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
            v-model="cloneAddress.comment"
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
        data-test="remove-btn"
        @click="$emit('removeAddress', address)"
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
import { cloneDeep } from 'lodash';

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

  data() {
    return {
      cloneAddress: {

      }
    }
  },

  mounted() {
    this.cloneAddress = cloneDeep(this.address);
  },

  methods: {
    ...mapActions('Auth', ['postAddress', 'putAddress']),

    saveAddress() {
      if ( this.mode === 'new' ) {
        let newAddress = {
          userId: this.user.id,
          name: this.cloneAddress.name,
          street: this.cloneAddress.street,
          building: this.cloneAddress.building,
          flat: this.cloneAddress.flat,
          comment: this.cloneAddress.comment
        };

        this.postAddress(newAddress);

        this.$store.dispatch('Auth/getAddresses');

      } else if ( this.mode === 'edit' ) {

        this.putAddress(this.address);

      }

      this.$store.dispatch('Auth/getAddresses');

      this.cloneAddress.name = '';
      this.cloneAddress.street = '';
      this.cloneAddress.building = '';
      this.cloneAddress.flat = '';
      this.cloneAddress.comment = '';

      this.$emit('closeForm', this.mode);
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/ds-system/ds.scss";
@import "~@/assets/scss/layout/sheet.scss";

.input {
  display: block;

  span {
    @include r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &:hover {
    input {
      border-color: $black;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    span {
      @include b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

.button {
  $bl: &;

  @include b-s18-h21;
  font-family: inherit;
  display: block;

  box-sizing: border-box;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  color: $white;
  border: none;
  border-radius: 8px;
  outline: none;
  box-shadow: $shadow-medium;

  background-color: $green-500;

  &:hover:not(:active):not(:disabled) {
    background-color: $green-400;
  }

  &:active:not(:disabled) {
    background-color: $green-600;
  }

  &:focus:not(:disabled) {
    opacity: 0.5;
  }

  &:disabled {
    background-color: $green-300;
    color: rgba($white, 0.2);
    cursor: default;
  }

  &--border {
    background-color: transparent;
    border: 1px solid $green-500;
    color: $black;
    box-shadow: none;

    &:hover:not(:active):not(:disabled) {
      color: $green-500;
      border-color: $green-500;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: $green-600;
      border-color: $green-600;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.5;
    }
  }

  &--transparent {
    @include b-s14-h16;
    background-color: transparent;
    box-shadow: none;
    color: $black;

    &:hover:not(:active):not(:disabled) {
      color: $red-800;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: $red-900;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.25;
    }
  }

  &--arrow {
    &::before {
      content: "";
      background-image: url("~@/assets/img/button-arrow.svg");
      background-position: center;
      background-repeat: no-repeat;
      margin-right: 16px;
      width: 18px;
      height: 18px;
      display: inline-block;
      vertical-align: middle;
      transform: translateY(-1px);
    }
  }

  &--white {
    background-color: $white;
    color: $green-500;
  }
}

.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  &--opened {
    #{$bl}__header {
      padding: 16px;
    }
  }

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include l-s11-h13;

    display: block;

    padding: 0 16px;
  }
}

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size {
    &--normal {
      width: 60.5%;
    }

    &--small {
      width: 18%;
    }
  }
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}

.address-form__header {
  @include b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}
</style>
