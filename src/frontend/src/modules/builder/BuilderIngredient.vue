<template>
  <div class="ingredients__item">
    <AppDrag
      :transfer-data="ingredient"
      :isDraggable="isDraggable(ingredient)"
    >

      <span
        class="filling"
        :class="`filling--${ingredient.type}`"
        :style="{'--varIngBcg': `url(${ingredient.image})`}"
        data-test="filling"
      >
        {{ ingredient.name }}
      </span>

      <BuilderItemCounter
        :counter="this.ingredient.counter"
        @countIngredient="countIngredient"
        data-test="item-counter"
      />
    </AppDrag>
  </div>
</template>
<script>
import AppDrag from '@/common/components/AppDrag';
import BuilderItemCounter from '@/modules/builder/BuilderItemCounter';

import { mapActions} from 'vuex';

export default {
  name: "BuilderIngredient",
  props: {
    ingredient: {
      type: Object,
      required: true
    }
  },
  components: {
    BuilderItemCounter,
    AppDrag,
  },
  methods: {
    ...mapActions("Builder", ["addIngredients"]),

    async countIngredient(counter) {
      this.ingredient.counter = counter;
      await this.addIngredients(this.ingredient);
    },

    isDraggable(ingredient) {
      return (ingredient.counter <= 2);
    },
  }
}
</script>
<style lang="scss" scoped>
.filling::before {
  cursor: pointer;
  background-image: var(--varIngBcg);
}
</style>
