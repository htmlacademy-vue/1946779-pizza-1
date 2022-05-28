<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <picture>
        <source
          type="image/webp"
          srcset="@/assets/img/users/user5@2x.webp 1x, @/assets/img/users/user5@4x.webp 2x"
        >
        <img
          src="@/assets/img/users/user5@2x.jpg"
          srcset="@/assets/img/users/user5@4x.jpg"
          alt="Василий Ложкин"
          width="72"
          height="72"
        >
      </picture>
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">Контактный телефон: <span>{{ user.phone }}</span></p>
    </div>

    <div
      v-if="addresses && ( addresses.length > 0 )"
      class="layout__address"
    >

      <ProfileAddressView
        v-for="address in this.addresses"
        :key="address.id"
        :address="address"
        @editAddress="editAddress"
      />

      <ProfileFormAddress
        v-if="showEditForm"
        :user="user"
        :address='editedAddress'
        :mode='"edit"'
        @removeAddress="removeAddress"
        @closeForm="closeForm"
      />

    </div>

    <div
      v-else
      class="layout__address"
    >

      <h2>Нет сохраненных aдресов</h2>

    </div>

    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        :disabled="showNewForm"
        @click="showForm"
      >
        Добавить новый адрес
      </button>
    </div>

      <ProfileFormAddress
        v-if="showNewForm"
        button-text="Отменить"
        :user="user"
        @removeAddress="removeAddress"
        @closeForm="closeForm"
      />
  </div>

</template>
<script>
import ProfileAddressView from '@/modules/profile/ProfileAddressView';
import ProfileFormAddress from '@/modules/profile/ProfileFormAddress';

import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import { cloneDeep } from 'lodash';

export default {
  name: "Profile",

  components: {
    ProfileAddressView,
    ProfileFormAddress
  },

  data: () => ({
    showEditForm: false,
    showNewForm: false,
    editedAddress: {},
  }),

  computed: {
    ...mapGetters('Auth', ['isAuthenticated']),

    ...mapState('Auth', ['user', 'addresses']),
  },

  created() {
    this.$store.dispatch('Auth/getAddresses');
  },

  methods: {
    ...mapActions('Auth', ['deleteAddress']),

    ...mapMutations('Auth', {
      getAddresses: 'GET_ADDRESS'
    }),

    showForm() {
      this.showNewForm = true;
    },

    editAddress(address) {
      this.editedAddress = cloneDeep(address);
      this.showEditForm = true;
    },

    removeAddress(address) {
      if( !address.id ) {
        this.showNewForm = false;
      } else if ( address.id ) {
        this.deleteAddress(address.id);
        this.showEditForm = false;
      }
    },

    closeForm(mode) {
      if (mode === 'edit') {
        this.showEditForm = false;
      } else if( mode === 'new' ) {
        this.showNewForm = false;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/ds-system/ds.scss";
@import "~@/assets/scss/layout/content.scss";
@import "~@/assets/scss/layout/layout.scss";

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

.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: 33px;
}

.user__name {
  @include b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__button {
  display: inline-block;

  cursor: pointer;
  vertical-align: middle;
}

.user__phone {
  @include b-s16-h19;

  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }
}

</style>
