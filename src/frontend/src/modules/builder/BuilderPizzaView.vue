<template>
  <AppDrop
    @drop="$emit('drop', $event)"
  >

    <label class="input">
      <span class="visually-hidden">Название пиццы</span>

      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        v-model="originalNameOfPizza"
        required
      >

    </label>

    <div class="content__constructor">
      <div
        class="pizza"
        :class="`pizza--foundation--${doughType}-${sauceType}`"
      >
        <div class="pizza__wrapper">
          <div
            v-for="(ingredientType, index) in dropIngredientParsed"
            :key="ingredientType.index"
            :data-id="index"
            class="pizza__filling"
            :class="[`pizza__filling--${ingredientType.info.type}`,
              {'pizza__filling--second': ingredientType.number === 2},
              {'pizza__filling--third': ingredientType.number === 3} ]"
          >
          </div>
        </div>
      </div>
    </div>

  </AppDrop>
</template>
<script>
import AppDrop from '@/common/components/AppDrop';
export default {
  name: "BuilderPizzaView",
  components: {
    AppDrop
  },
  props: {
    ingredientDroped: {
      type: Array,
      default: null,
      required: true
    },
    doughType: {
      type: String,
    },
    sauceType: {
      type: String,
    },
  },
  data() {
    return {
      originalNameOfPizza: ''
    }
  },
  watch: {
    originalNameOfPizza: function(newVal) {
      this.$emit("inputNameOfPizza", newVal);
    },
  },
  computed: {
    dropIngredientParsed: function() {
      let newArrIngredients = [];
      this.ingredientDroped.forEach( element => {
        for (let index = 1; index <= parseInt(element.info.counter); index++) {
          const cloneElement = Object.assign({}, element);
          cloneElement.number = index;
          newArrIngredients.push(cloneElement);
        }
      });
      return newArrIngredients;
    }
  }
}
</script>
