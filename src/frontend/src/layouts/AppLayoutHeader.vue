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
          to="/cart"
        >
          {{price}} ₽
        </router-link>

      </div>
      <div class="header__user">
        <a
          v-if="isLogin"
          href="#"
          class="header__logout"
           @click.prevent="goToAuth"
        >
          <picture>
            <source type="image/webp" srcset="@/assets/img/users/user5.webp 1x, @/assets/img/users/user5@2x.webp 2x">
            <img src="@/assets/img/users/user5.jpg" srcset="@/assets/img/users/user5@2x.jpg" alt="Василий Ложкин" width="32" height="32">
          </picture>
          <span>{{ user.name }}</span>
        </a>

        <a
          v-else-if="!isLogin"
          href="#"
          class="header__login"
          @click.prevent="goToAuth"
        >
          <span>Войти</span>
        </a>
      </div>

    </header>
</template>
<script>
export default {
  name: "AppLayout",
  props: {
    price: {
      type: Number,
      default: 0
    },
    isLogin: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    goToAuth() {
      if(this.isLogin) {
        this.$router.push({ name: 'Profile' });
      } else if (!this.isLogin) {
        this.$router.push({ name: 'Login' });
      }
    },
  }
}
</script>
