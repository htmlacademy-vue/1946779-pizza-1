<template>
  <div class="">
    <div class="ingredients__sauce">
      <p>Основной соус:</p>

      <BuilderSauceSelector
        v-for="sauce in sauces"
        :key="sauce.id"
        :sauce="sauce"
      />

    </div>

    <div class="ingredients__filling">
      <p>Начинка:</p>

      <ul class="ingredients__list">

        <BuilderIngredient
          v-for="ingredient in ingredients"
          :key="ingredient.id"
          :ingredient="ingredient"
        />

      </ul>
    </div>
  </div>
</template>

<script>
import BuilderSauceSelector from '@/modules/builder/BuilderSauceSelector';
import BuilderIngredient from '@/modules/builder/BuilderIngredient';

import { mapState } from 'vuex';

export default {
  name: "BuilderIngredientsSelector",
  components: {
    BuilderSauceSelector,
    BuilderIngredient
  },
  computed: {
    ...mapState('Builder', ['ingredients', 'sauces']),
  },
}
</script>
