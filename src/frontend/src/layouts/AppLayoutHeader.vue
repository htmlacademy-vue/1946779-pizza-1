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
            data-test="cart-full"
          >
            {{ this.finalPrice }} ₽
          </router-link>

          <router-link
            v-else
            href="#"
            to="/cart"
            data-test="cart-empty"
          >
           0 ₽
          </router-link>


      </div>
      <div
        class="header__user"
        v-if="isAuthenticated"
        data-test="user-auth"
      >
        <router-link
          to="/profile"
        >
          <picture>
            <source type="image/webp"
            :srcset="user.avatar"
            data-test="picture-source"
            >

            <img
            :src="user.avatar"
            data-test="img-source"
            alt="Василий Ложкин" width="32" height="32"
            >
          </picture>
          <span>{{ user.name }}</span>

        </router-link>

        <a
          href="#"
          class="header__logout"
          @click.prevent='$logout'
          data-test="logout-link"
        >
          <span>Выйти</span>
        </a>
      </div>

      <div
        class="header__user"
        v-else
        data-test="user-not-auth"
      >
        <router-link
          class="header__login"
          to="/login"
        >
          <span>Войти</span>
        </router-link>
      </div>

    </header>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import { logout } from '@/common/mixins';

export default {
  name: "AppLayoutHeader",
  mixins: [logout],
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState('Cart', ['pizzas']),
    ...mapGetters('Auth', ['isAuthenticated']),
    ...mapGetters('Cart', ['finalPrice']),
  }
}
</script>
