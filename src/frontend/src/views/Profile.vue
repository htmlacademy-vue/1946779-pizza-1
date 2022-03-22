<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <picture>
        <source type="image/webp" srcset="@/assets/img/users/user5@2x.webp 1x, @/assets/img/users/user5@4x.webp 2x">
        <img src="@/assets/img/users/user5@2x.jpg" srcset="@/assets/img/users/user5@4x.jpg" alt="Василий Ложкин" width="72" height="72">
      </picture>
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">Контактный телефон: <span>{{ user.phone }}</span></p>
    </div>

    <div
      class="layout__address"
      v-if="addresses && ( addresses.length > 0 )"
    >

      <ProfileAddressView
        @editAddress="editAddress"
        v-for="address in this.addresses"
        :key="address.id"
        :address="address"
      />

      <ProfileFormAddress
        v-show="showEditForm"
        :user="user"
        :address='editedAddress'
        :mode='"edit"'
        @removeAddress="removeAddress"
        @closeForm="closeForm"
      />

    </div>

    <div
      class="layout__address"
      v-else
    >

      <h2>Нет сохраненных aдресов</h2>

    </div>

    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click="showForm"
        :disabled="showNewForm"
      >
        Добавить новый адрес
      </button>
    </div>

      <ProfileFormAddress
        buttonText="Отменить"
        v-show="showNewForm"
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
  data: () => ({
    showEditForm: false,
    showNewForm: false,
    editedAddress: {},
  }),
  components: {
    ProfileAddressView,
    ProfileFormAddress
  },
  computed: {
    ...mapGetters('Auth', ['isAuthenticated']),
    ...mapState('Auth', ['user', 'addresses']),
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
      this.showEditForm = true;
      this.editedAddress = cloneDeep(address);
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
  },

  created() {
    this.$store.dispatch('Auth/getAddresses');
  }
}
</script>
