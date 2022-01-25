<template>
  <div class="">
    <div class="ingredients__sauce">
      <p>Основной соус:</p>

      <label
        v-for="sauce in sauces"
        :key="sauce.id"
        class="radio ingredients__input"
      >

        <BuilderSauceSelector
          :sauce="sauce"
          @sendSauceData="sendSauceData"
        />

      </label>
    </div>

    <div class="ingredients__filling">
      <p>Начинка:</p>

      <ul class="ingredients__list">
        <li
          v-for="ingredient in ingredients"
          :key="ingredient.id"
          class="ingredients__item"
          :data-id="ingredient.counter"
        >

          <AppDrag
            :transfer-data="ingredient"
            :draggable="ingredient.counter <= 2"
          >
            <span
              class="filling"
              :class="`filling--${ingredient.type}`"
              :style="{'--varIngBcg': `url(${ingredient.image})`}"

            >
              {{ ingredient.name }}
            </span>

            <ItemCounter
              :ingredient="ingredient"
              @moveIngredient="moveIngredient"
            />
          </AppDrag>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AppDrag from '@/common/components/AppDrag';
import ItemCounter from '@/common/components/ItemCounter';
import BuilderSauceSelector from '@/modules/builder/BuilderSauceSelector'

export default {
  name: "BuilderIngredientsSelector",
  props: {
    sauces: {
      type: Array,
      required: true,
      default: null
    },
    ingredients: {
      type: Array,
      required: true,
      default: null
    },
  },
  components: {
    ItemCounter,
    BuilderSauceSelector,
    AppDrag,

  },
  data() {
    return {
      saucePrice: '',
      ingredientInfoObject: {}
    }
  },
  methods: {
    sendSauceData(saucePrice) {
      this.$emit("sendSauceData", saucePrice);
    },
    moveIngredient(ingredientInfoObject) {
      this.$emit('moveIngredient', ingredientInfoObject);
    },

  },

}
</script>

<style lang="scss" scoped>
.filling::before {
  cursor: pointer;
  background-image: var(--varIngBcg);
}
</style>
