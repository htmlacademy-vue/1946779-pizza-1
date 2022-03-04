<template>
  <header class="header">
      <div class="header__logo">
        <router-link
          to="/"
          class="logo"
        >
          <img
            img src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>
      </div>
      <div class="header__cart">

          <router-link
            v-if="this.pizzas.length > 0"
            to="/cart"
          >
            {{ this.finalPrice }} ₽
          </router-link>

          <router-link
            v-else
            href="#"
            class="empty"
            to="/cart"

          >
          </router-link>


      </div>
      <div class="header__user">
        <router-link
          v-if="isLogin"
          class="header__logout"
          to="/profile"
        >
          <picture>
            <source type="image/webp" srcset="@/assets/img/users/user5.webp 1x, @/assets/img/users/user5@2x.webp 2x">
            <img src="@/assets/img/users/user5.jpg" srcset="@/assets/img/users/user5@2x.jpg" alt="Василий Ложкин" width="32" height="32">
          </picture>
          <span>{{ user.name }}</span>
        </router-link>

        <router-link
          v-else-if="!isLogin"
          class="header__login"
          to="/login"
        >
          <span>Войти</span>
        </router-link>
      </div>

    </header>
</template>
<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: "AppLayout",
  props: {

    isLogin: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState('Cart', ['pizzas']),
    ...mapGetters('Cart', ['finalPrice']),
  }
}
</script>
