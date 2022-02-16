import pizzaObj from '@/static/pizza.json';
import { uniqueId } from 'lodash';

import { normalizeDough, normalizeSize, normalizeSauce, normalizeIngredients } from '@/common/helpers';

const setupState = () => ({
  ingredients: [],
    sauces: [],
    sizes: [],
    doughs: [],
    buildedPizza: {
      id: uniqueId(),
      count: 1,
      dough: {},
      ingredients: [],
      pizzaName: '',
      price: 0,
      sauce: {},
      size: {}
    },
});

export default {
  namespaced: true,
  state: {
    ingredients: [],
    sauces: [],
    sizes: [],
    doughs: [],
    buildedPizza: {
      id: uniqueId(),
      count: 1,
      dough: {},
      ingredients: [],
      pizzaName: '',
      price: 0,
      sauce: {},
      size: {}
    },
  },
  mutations: {
    SET_INGREDIENTS: (state, data) => (state.ingredients = data),
    SET_SAUCES: (state, data) => (state.sauces = data),
    SET_DOUGHS: (state, data) => (state.doughs = data),
    SET_SIZES: (state, data) => (state.sizes = data),

    ADD_PIZZA_NAME: (state, name) => (state.buildedPizza.pizzaName = name),
    ADD_SAUCE: (state, sauce) => (state.buildedPizza.sauce = sauce),
    ADD_SIZE: (state, size) => (state.buildedPizza.size = size),
    ADD_DOUGH: (state, dough) => (state.buildedPizza.dough = dough),
    ADD_PRICE: (state, price) => (state.buildedPizza.price = price),

    CHANGE_INGREDIENTS: (state, ingredientsAdded) => (state.buildedPizza.ingredients = ingredientsAdded),
    CHANGE_INGREDIENTS_COUNT: (state, ingredient) =>
      (state.ingredients.find(el => el.id === ingredient.id).counter = ingredient.counter),

    RESET_STATE: (state) => {
      const newState = setupState();
      Object.assign(state, setupState());
    },
  },
  getters: {
    pricePizza: (state) => {
       let ingredientsPriceSum = 0;

      state.buildedPizza.ingredients.forEach( ingredient => {
        ingredientsPriceSum += parseInt(ingredient.counter * ingredient.price);
      });

      return ((state.buildedPizza.sauce.price + state.buildedPizza.dough.price + ingredientsPriceSum) * state.buildedPizza.size);
    }
   },
  actions: {
    setPizza({ commit }) {
      const pizza  = Object.assign({}, pizzaObj);

      const ingredients = pizza.ingredients.map( (item) => normalizeIngredients(item));
      commit('SET_INGREDIENTS', ingredients);

      const doughs = pizza.dough.map( (item) => normalizeDough(item));
      commit('SET_DOUGHS', doughs);

      const sizes = pizza.sizes.map( (item) => normalizeSize(item));
      commit('SET_SIZES', sizes);

      const sauces = pizza.sauces.map( (item) => normalizeSauce(item));
      commit('SET_SAUCES', sauces);
    },

    addIngredients({ state, commit }, ingredient) {
      const ingredientMovedArray = state.buildedPizza.ingredients;

      if (!ingredientMovedArray.find( el => el.id === ingredient.id )) {
        ingredientMovedArray.push(ingredient);

        commit('CHANGE_INGREDIENTS_COUNT', ingredient);
        commit('CHANGE_INGREDIENTS', ingredientMovedArray);

      } else if (ingredientMovedArray.find( el => el.id=== ingredient.id )) {
        const findedElement = ingredientMovedArray.find(el => el.id === ingredient.id);
        ingredientMovedArray.splice(ingredientMovedArray.indexOf(findedElement), 1);
        ingredientMovedArray.push(ingredient);

        commit('CHANGE_INGREDIENTS_COUNT', ingredient);
        commit('CHANGE_INGREDIENTS', ingredientMovedArray);
      }
    },
  },
};
