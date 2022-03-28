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
        <transition-group name="ingredients" tag="ul" class="pizza__wrapper">
          <div
            v-for="(ingredientType, index) in dropIngredientParsed"
            :key="ingredientType.keyId"
            :data-id="index"
            class="pizza__filling"
            :class="[`pizza__filling--${ingredientType.type}`,
              {'pizza__filling--second': ingredientType.number === 2},
              {'pizza__filling--third': ingredientType.number === 3} ]"
          >
          </div>
        </transition-group>
      </div>
    </div>

  </AppDrop>
</template>
<script>
import AppDrop from '@/common/components/AppDrop';
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  name: "BuilderPizzaView",
  components: {
    AppDrop
  },
  data() {
    return {
      originalNameOfPizza: '',
    }
  },
  methods: {
    ...mapMutations("Builder", {
      setPizzaName: "ADD_PIZZA_NAME"
    }),
  },
  watch: {
    originalNameOfPizza: function(newVal) {
      this.setPizzaName(newVal);
    },
  },
  computed: {
    ...mapState("Builder", ['buildedPizza']),

    doughType: function() {
      return this.buildedPizza.dough.type;
    },

    sauceType: function() {
      return this.buildedPizza.sauce.type;
    },

    dropIngredientParsed: function() {
      let newArrIngredients = [];
      this.buildedPizza.ingredients.forEach( element => {
        for (let index = 1; index <= parseInt(element.counter); index++) {
          const cloneElement = Object.assign({}, element);
          cloneElement.number = index;
          cloneElement.keyId = cloneElement.id * cloneElement.number + cloneElement.type;
          newArrIngredients.unshift(cloneElement);
        }
      });

      return newArrIngredients;
    }
  },
  created() {
    this.originalNameOfPizza = this.buildedPizza.pizzaName;
  }

}
</script>
<style lang="scss" scoped>

.ingredients-enter-active,
.ingredients-leave-active {
  transition: all 0.3s ease-in-out;
}

.ingredients-enter,
.ingredients-leave-to {
  width: 0;

  opacity: 0;
}
</style>
