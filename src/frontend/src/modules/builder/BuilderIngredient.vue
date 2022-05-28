<template>
  <div class="ingredients__item">
    <AppDrag
      :transfer-data="ingredient"
      :is-draggable="isDraggable(ingredient)"
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
        data-test="item-counter"
        @countIngredient="countIngredient"
      />
    </AppDrag>
  </div>
</template>
<script>
import AppDrag from '@/common/components/AppDrag';
import BuilderItemCounter from '@/modules/builder/BuilderItemCounter';
import { cloneDeep } from 'lodash';
import { mapActions} from 'vuex';

export default {
  name: "BuilderIngredient",
  components: {
    BuilderItemCounter,
    AppDrag,
  },

  props: {
    ingredient: {
      type: Object,
      required: true
    }
  },

  methods: {
    ...mapActions("Builder", ["addIngredients"]),
    async countIngredient(counter) {
      let newIngr = cloneDeep(this.ingredient);
      newIngr.counter = counter;
      await this.addIngredients(newIngr);
    },

    isDraggable(ingredient) {
      return (ingredient.counter <= 2);
    },
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  &::before {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    content: "";

    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }
}

.filling::before {
  cursor: pointer;
  background-image: var(--varIngBcg);
}
</style>
