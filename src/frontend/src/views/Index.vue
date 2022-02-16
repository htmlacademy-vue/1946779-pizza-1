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

            <BuilderPriceCounter
            />

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
import BuilderPriceCounter from '@/modules/builder/BuilderPriceCounter';

import { mapActions, mapState } from 'vuex';

export default {
  name: "IndexHome",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter
  },

  computed: {
    ...mapState("Builder", ['sizes', 'doughs']),

  },
  methods: {
    ...mapActions("Builder", ["addIngredients"]),

    async dropIngr(ingredient) {
      ingredient.counter += 1;
      await this.addIngredients(ingredient);
    },

    inputNameOfPizza(inputValue) {
      this.nameOfPizza = inputValue;
    },
    movePriceToCart() {
      this.$emit('sendInfo', infoAboutPizza);
    }
  },
  created() {
    this.$store.dispatch("Builder/setPizza")
  }
}
</script>
