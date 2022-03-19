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

    <div class="layout__address">

      <ProfileAddressView

      />

    </div>

    <div class="layout__address">

      <ProfileFormAddress
        :user="user"
      />

    </div>

    <div class="layout__button">
      <button type="button" class="button button--border">Добавить новый адрес</button>
    </div>
  </div>

</template>
<script>
import ProfileAddressView from '@/modules/profile/ProfileAddressView';
import ProfileFormAddress from '@/modules/profile/ProfileFormAddress';

import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: "Profile",
  components: {
    ProfileAddressView,
    ProfileFormAddress
  },
  computed: {
    ...mapState('Auth', ['isAuthenticated', 'user', 'address']),
  }
}
</script>
