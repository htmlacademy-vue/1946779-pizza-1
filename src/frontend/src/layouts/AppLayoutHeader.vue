<template>
  <header class="header">
      <div class="header__logo">
        <router-link
          to="/"
          class="logo"
        >
          <img
            src="@/assets/img/logo.svg"
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
            to="/cart"
          >
           0 ₽
          </router-link>


      </div>
      <div
        v-if="isAuthenticated"
        class="header__user"
      >
        <router-link
          to="/profile"
        >
          <picture>
            <source
              type="image/webp"
              :srcset="user.avatar"
            >

            <img
              alt="Василий Ложкин"
              width="32"
              height="32"
              :src="user.avatar"
            >
          </picture>
          <span>{{ user.name }}</span>

        </router-link>

        <a
          href="#"
          class="header__logout"
          @click.prevent='$logout'
        >
          <span>Выйти</span>
        </a>
      </div>

      <div
        v-else
        class="header__user"
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
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import { logout } from '@/common/mixins';

export default {
  name: "AppLayout",
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
