<template>
  <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img src="@/assets/img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40">
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">{{priceToCart}} ₽</a>
      </div>
      <div class="header__user">
        <a v-if="isLogin" href="#" class="header__logout"><span>Администратор</span></a>
        <a v-else-if="!isLogin" href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>
</template>
<script>
export default {
  name: "AppLayout",
  props: {
    priceToCart: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isLogin: false,
    }
  }
}
</script>
