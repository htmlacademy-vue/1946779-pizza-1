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
          v-if="isAuthenticated"
          class="header__logout"
          to="/profile"
        >
          <picture>
            <source type="image/webp"
            :srcset="user.avatar"
            >

            <img
            :src="user.avatar"

            alt="Василий Ложкин" width="32" height="32"
            >
          </picture>
          <span>{{ user.name }}</span>
        </router-link>

        <router-link
          v-else
          class="header__login"
          to="/login"
        >
          <span>Войти</span>
        </router-link>
      </div>

    </header>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: "AppLayout",
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState('Auth', ['isAuthenticated']),
    ...mapState('Cart', ['pizzas']),
    ...mapGetters('Cart', ['finalPrice']),
  }
}
</script>
