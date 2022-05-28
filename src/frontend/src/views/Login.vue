<template>
  <div class="sign-form-wrapper">
    <div class="sign-form">
      <a
        href="#"
        class="close close--white"
        @click.prevent="$router.push({ name: 'Home'})"
      >
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </a>
      <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
      </div>
      <form
        @submit.prevent="login"
      >
        <div class="sign-form__input">
          <label class="input">
            <span>E-mail</span>

            <AppInput
              ref="email"
              v-model="email"
              type="email"
              name="email"
              class="input"
              placeholder="example@mail.ru"
              :error-text="validations.email.error"
            />
          </label>
        </div>

        <div class="sign-form__input">
          <label class="input">
            <span>Пароль</span>

            <AppInput
            v-model="password"
            type="password"
            name="password"
            class="input"
            placeholder="***********"
            :error-text="validations.password.error"
          />
          </label>
        </div>

        <AppButton
          class="button"
          type="submit"
        >
          Авторизоваться
        </AppButton>

      </form>
    </div>
  </div>
</template>
<script>
import { validator } from '@/common/mixins';

export default {
  name: "Login",
  mixins: [validator],
  data: () => ({
    email: '',
    password: '',
    validations: {
      email: {
        error: '',
        rules: ['required', 'email']
      },

      password: {
        error: '',
        rules: ['required']
      }
    }
  }),

  watch: {
    email() {
      this.$clearValidationErrors();
    },

    password() {
      this.$clearValidationErrors();
    }
  },

  mounted() {
    this.$refs.email.$refs.input.focus();
  },

  methods: {
    async login() {
      if (!this.$validateFields(
        { email: this.email, password: this.password },
        this.validations
      )) {
        return;
      }

      await this.$store.dispatch('Auth/login', {
        email: this.email,
        password: this.password
      });

      await this.$router.push('/');
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/ds-system/ds.scss";

.sign-form-wrapper {
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}

.sign-form {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;

  background: $white url("~@/assets/img/popup.svg") no-repeat center top;
  box-shadow: $shadow-light;

  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.sign-form__title {
  margin-bottom: 24px;

  text-align: center;
}

.sign-form__input {
  margin-bottom: 16px;
}

.close {
  position: absolute;
  top: 16px;
  right: 16px;

  width: 25px;
  height: 25px;

  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;

  color: $black;
  border-radius: 50%;
  outline: none;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 25px;
    height: 2px;

    content: "";

    border-radius: 2px;
    background-color: $black;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }

  &:focus {
    &::before,
    &::after {
      background-color: $orange-100;
    }
  }

  &--white {
    &::before,
    &::after {
      background-color: $white;
    }
  }
}
</style>
