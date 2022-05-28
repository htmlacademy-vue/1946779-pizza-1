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
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>
