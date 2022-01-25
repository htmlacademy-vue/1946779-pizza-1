<template>
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
                :sauces="sauces"
                :ingredients="ingredients"
                @sendSaucePrice="sendSaucePrice"

              />

            </div>
          </div>
        </div>

        <div class="content__pizza">
          <BuilderPizzaView/>

          <BuilderPriceCounter/>

        </div>

      </div>

    </form>
  </main>
</template>
<script>
import BuilderDoughSelector from '@/modules/builder/BuilderDoughSelector';
import BuilderSizeSelector from '@/modules/builder/BuilderSizeSelector';
import BuilderIngredientsSelector from '@/modules/builder/BuilderIngredientsSelector';
import BuilderPizzaView from '@/modules/builder/BuilderPizzaView';
import BuilderPriceCounter from '@/modules/builder/BuilderPriceCounter';

import pizza from '@/static/pizza';

import { normalizeDough, normalizeSize, normalizeSauce, normalizeIngredients } from '@/common/helpers';

export default {
  name: "AppLayoutMainContent",
  data() {
    return {
      ingredientsArray: Array,
    }
  },
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter
  },
  data() {
    return {
      doughs: pizza.dough.map( (item) => normalizeDough(item)),
      sizes: pizza.sizes.map( (item) => normalizeSize(item)),
      sauces: pizza.sauces.map( (item) => normalizeSauce(item)),
      ingredients: pizza.ingredients.map( (item) => normalizeIngredients(item)),
      saucePrice: '',
    };
  },
  methods: {
    sendSaucePrice(saucePrice) {
      this.saucePrice = saucePrice;
    },
  }
}
</script>
