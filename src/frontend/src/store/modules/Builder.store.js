import { uniqueId } from 'lodash';

const setupState = () => ({
  id: uniqueId(),
  count: 1,
  dough: {},
  ingredients: [],
  pizzaName: '',
  price: 0,
  sauce: {},
  size: {}
});

export default {
  namespaced: true,

  state: {
    ingredients: [],
    sauces: [],
    sizes: [],
    doughs: [],
    buildedPizza: setupState(),
  },

  mutations: {
    SET_INGREDIENTS: (state, data) => (state.ingredients = data),
    SET_SAUCES: (state, data) => (state.sauces = data),
    SET_DOUGHS: (state, data) => (state.doughs = data),
    SET_SIZES: (state, data) => (state.sizes = data),

    ADD_PIZZA_NAME: (state, name) => (state.buildedPizza.pizzaName = name),

    ADD_SAUCE: (state, sauce) => (state.buildedPizza.sauce = sauce),
    SET_SAUCE: (state, sauceId) => {
      state.sauces.find( el => el.id === sauceId).checked = true;
      state.sauces.find( el => el.id !== sauceId).checked = false;
    },

    ADD_SIZE: (state, size) => (state.buildedPizza.size = size),
    SET_SIZE: (state, sizeId) => {
      state.sizes.find( el => el.id === sizeId).checked = true;
      state.sizes.find( el => el.id !== sizeId).checked = false;
    },

    ADD_DOUGH: (state, dough) => (state.buildedPizza.dough = dough),
    SET_DOUGH: (state, doughId) => {
      state.doughs.find( el => el.id === doughId).checked = true;
      state.doughs.find( el => el.id !== doughId).checked = false;
    },

    SET_ID: (state, pizzaId) => (state.buildedPizza.id = pizzaId),

    SET_INGREDIENT_COUNT: (state, comingIngredients) => {
      comingIngredients.forEach( element => {
        state.ingredients.find(el => el.id === element.id).counter = element.counter;
      });
    },

    ADD_PRICE: (state, price) => (state.buildedPizza.price = price),

    CHANGE_INGREDIENTS: (state, ingredientsAdded) => (state.buildedPizza.ingredients = ingredientsAdded),

    CHANGE_INGREDIENTS_COUNT: (state, ingredient) =>
      (state.ingredients.find(el => el.id === ingredient.id).counter = ingredient.counter),

    RESET_STATE: (state) => {
      Object.assign(state.buildedPizza, setupState());
    },

    SET_PIZZA_TO_CHANGE: (state, pizza) => (state.buildedPizza = pizza),
  },
  getters: {
    pricePizza: (state) => {
       let ingredientsPriceSum = 0;

      state.buildedPizza.ingredients.forEach( ingredient => {
        ingredientsPriceSum += parseInt(ingredient.counter * ingredient.price);
      });

      return ((state.buildedPizza.sauce.price + state.buildedPizza.dough.price + ingredientsPriceSum) * state.buildedPizza.size.multiplier);
    }
   },
  actions: {
    async query({ commit } ) {
      let items = [
        async () => {
          const ingredients = await this.$api.ingredients.query();
          commit('SET_INGREDIENTS', ingredients);
        },
        async () => {
          const doughs = await this.$api.dough.query();
          commit('SET_DOUGHS', doughs);
        },
        async () => {
          const sizes = await this.$api.sizes.query();
          commit('SET_SIZES', sizes);
        },
        async () => {
          const sauces = await this.$api.sauces.query();
          commit('SET_SAUCES', sauces);
        },
      ]

      return Promise.all(items.map(p => p()));
    },

    addIngredients({ state, commit }, ingredient) {
      const ingredientMovedArray = state.buildedPizza.ingredients;

      if (!ingredientMovedArray.find( el => el.id === ingredient.id )) {
        ingredientMovedArray.unshift(ingredient);

        commit('CHANGE_INGREDIENTS_COUNT', ingredient);
        commit('CHANGE_INGREDIENTS', ingredientMovedArray);

      } else if (ingredientMovedArray.find( el => el.id=== ingredient.id )) {
        const findedElement = ingredientMovedArray.find(el => el.id === ingredient.id);
        ingredientMovedArray.splice(ingredientMovedArray.indexOf(findedElement), 1);
        ingredientMovedArray.unshift(ingredient);

        commit('CHANGE_INGREDIENTS_COUNT', ingredient);
        commit('CHANGE_INGREDIENTS', ingredientMovedArray);
      }
    },
    dropIngredients({ state, commit }, ingredient) {
      const ingredientMovedArray = state.buildedPizza.ingredients;

      if (!ingredientMovedArray.find( el => el.id === ingredient.id )) {
        ingredient.counter += 1;
        commit('CHANGE_INGREDIENTS_COUNT', ingredient);

        let newIngredient = state.ingredients.find( el => el.id=== ingredient.id );

        ingredientMovedArray.unshift(newIngredient);

        commit('CHANGE_INGREDIENTS', ingredientMovedArray);

      } else if (ingredientMovedArray.find( el => el.id=== ingredient.id )) {
        ingredient.counter += 1;
        commit('CHANGE_INGREDIENTS_COUNT', ingredient);

        const findedElement = ingredientMovedArray.find(el => el.id === ingredient.id);
        let newIngredient = state.ingredients.find( el => el.id=== ingredient.id );

        ingredientMovedArray.splice(ingredientMovedArray.indexOf(findedElement), 1);
        ingredientMovedArray.unshift(newIngredient);

        commit('CHANGE_INGREDIENTS', ingredientMovedArray);
      }
    },
    async setChangingPizza({ commit }, copyPizza) {
        commit('SET_PIZZA_TO_CHANGE', copyPizza),
        commit('SET_SAUCE', copyPizza.sauce.id),
        commit('SET_DOUGH', copyPizza.dough.id),
        commit('SET_SIZE', copyPizza.size.id),
        commit('SET_INGREDIENT_COUNT', copyPizza.ingredients),
        commit('SET_ID', copyPizza.id);
    }
  },
};
