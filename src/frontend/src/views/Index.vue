<template>
  <div class="">
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img src="@/assets/img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40">
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <a v-if="isLogin" href="#" class="header__logout"><span>Администратор</span></a>
        <a v-else-if="!isLogin" href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

    <main class="content">
      <form action="#" method="post">

        <div class="content__wrapper">

          <h1 class="title title--big">Конструктор пиццы</h1>

          <div class="content__dough">

            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>

              <div class="sheet__content dough">
                <label
                    v-for="dough in doughs"
                    :key="dough.id"
                    :class="`dough__input--${dough.type}`"
                    :style="{'--varBag': `url(${dough.image})`}"
                    class="dough__input"
                    >

                  <input
                    :value="dough.type"
                    :data-price="dough.price"
                    type="radio"
                    name="dough"
                    class="visually-hidden"
                    checked
                    >
                  <b>{{dough.name}}</b>
                  <span>{{dough.description}}</span>

                </label>
              </div>

            </div>

          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <label
                  v-for="size in sizes"
                  :key="size.id"
                  :class="`diameter__input--${size.size}`"
                  :style="{'--varSize': `url(${size.image})`}"
                  class="diameter__input"
                  >

                  <input
                    :value="size.name.split(' ', )[0]"
                    :data-multiplier="size.multiplier"
                    type="radio"
                    name="diameter"
                    class="visually-hidden"
                    checked
                    >
                  <span>{{size.name}}</span>

                </label>
              </div>
            </div>
          </div>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

              <div class="sheet__content ingredients">

                <div class="ingredients__sauce">
                  <p>Основной соус:</p>

                  <label
                    v-for="sauce in sauces"
                    :key="sauce.id"
                    class="radio ingredients__input"
                    >

                    <input
                      :value="sauce.sauce"
                      :data-price="sauce.price"
                      type="radio"
                      name="sauce"
                      checked
                      >
                    <span>{{ sauce.name }}</span>

                  </label>
                </div>

                <div class="ingredients__filling">
                  <p>Начинка:</p>

                  <ul class="ingredients__list">
                    <li
                      v-for="ingredient in ingredients"
                      :key="ingredient.id"
                      class="ingredients__item"
                      >

                      <span
                        class="filling"
                        :class="`filling--${ingredient.ing}`"
                        :style="{'--varIngBcg': `url(${ingredient.image})`}"
                        >
                        {{ ingredient.name }}
                      </span>

                      <div class="counter counter--orange ingredients__counter">
                        <button type="button" class="counter__button counter__button--minus" disabled>
                          <span class="visually-hidden">Меньше</span>
                        </button>

                        <input
                          :data-price="ingredient.price"
                          type="text"
                          name="counter"
                          class="counter__input"
                          value="0"
                          >

                        <button type="button" class="counter__button counter__button--plus">
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>

                    </li>
                  </ul>

                </div>

              </div>
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input type="text" name="pizza_name" placeholder="Введите название пиццы">
            </label>

            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button" disabled>Готовьте!</button>
            </div>
          </div>

        </div>

      </form>
    </main>
  </div>
</template>
<script>
import pizza from '@/static/pizza';

import { normalizeDough, normalizeSize, normalizeSauce, normalizeIngredients } from '@/common/helpers'

export default {
  name: "IndexHome",
  data() {
    return {
      isLogin: false,
      doughs: pizza.dough.map( (item) => normalizeDough(item)),
      sizes: pizza.sizes.map( (item) => normalizeSize(item)),
      sauces: pizza.sauces.map( (item) => normalizeSauce(item)),
      ingredients: pizza.ingredients.map( (item) => normalizeIngredients(item)),
    };
  },
}
</script>
<style lang="scss" scoped>
.dough__input--light {
  b {
      &::before {
        background-image: var(--varBag);
      }
    }
}
.dough__input--large {
  b {
      &::before {
        background-image: var(--varBag);
      }
    }
}
.diameter__input {
  span {
    &::before {
      background-image: var(--varSize);
    }
  }
}
.filling::before {
  background-image: var(--varIngBcg);
}
</style>
