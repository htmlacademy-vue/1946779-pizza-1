<template>
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
  },
  mounted() {
    this.$refs.email.$refs.input.focus();
  },
}
</script>
