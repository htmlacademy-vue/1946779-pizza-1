<template>
  <div>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">

          <h1 class="title title--big">Конструктор пиццы</h1>

          <div class="content__dough">

            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>

              <div class="sheet__content dough">

                <BuilderDoughSelector
                  v-for="dough in doughs"
                  :key="dough.id"
                  :dough=dough
                />

              </div>

            </div>

          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <BuilderSizeSelector
                  v-for="size in sizes"
                  :key="size.id"
                  :size="size"
                />

              </div>
            </div>
          </div>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

              <div class="sheet__content ingredients">

                <BuilderIngredientsSelector

                />

              </div>
            </div>
          </div>

          <div class="content__pizza">

            <BuilderPizzaView
              @drop="dropIngr($event)"
            />

            <div
              class="content__result"
            >
              <p>Итого: {{ pricePizza }} ₽</p>

              <button
                type="button"
                class="button"
                :disabled=" (buildedPizza.ingredients.length < 1) || (buildedPizza.pizzaName === '') "
                @click="putPizza"
              >
                Готовьте!
              </button>
            </div>
          </div>

        </div>

      </form>
    </main>
  </div>
</template>
<script>
import BuilderDoughSelector from '@/modules/builder/BuilderDoughSelector';
import BuilderSizeSelector from '@/modules/builder/BuilderSizeSelector';
import BuilderIngredientsSelector from '@/modules/builder/BuilderIngredientsSelector';
import BuilderPizzaView from '@/modules/builder/BuilderPizzaView';

import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';

export default {
  name: "IndexHome",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },

  computed: {
    ...mapGetters("Builder", ["pricePizza"]),
    ...mapState("Builder", ['buildedPizza', 'sizes', 'doughs']),
  },
  methods: {
    ...mapActions("Builder", ["addIngredients", 'query', "dropIngredients"]),

    ...mapMutations("Cart", {
      setPizza: 'SET_PIZZA'
    }),

    ...mapMutations("Builder", {
      addPrice: 'ADD_PRICE',
      resetState: 'RESET_STATE'
    }),

    dropIngr(ingredient) {
      this.dropIngredients(ingredient);
    },

    inputNameOfPizza(inputValue) {
      this.nameOfPizza = inputValue;
    },

    movePriceToCart() {
      this.$emit('sendInfo', infoAboutPizza);
    },

    putPizza() {
      this.addPrice(this.pricePizza);
      this.setPizza(Object.assign( {}, this.buildedPizza));
      this.resetState();
      this.query();
      this.$router.push({ name: 'Cart' });
    }
  },
}
</script>
