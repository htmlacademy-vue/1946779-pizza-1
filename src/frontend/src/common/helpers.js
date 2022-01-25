import { dough_types, pizza_sizes, pizza_sauces, pizza_ingredients } from "@/common/constants";

// Нормализация массыва с видом теста.
export const normalizeDough = dough => {
  return {
    ...dough,
    type: dough_types.find(({ label }) => dough.name === label)?.value,
    checked: dough_types.find(({ label }) => dough.name === label)?.checked,
  };
};

// Нормализация массыва с размером пиццы.
export const normalizeSize = sizes => {
  return {
    ...sizes,
    type: pizza_sizes.find(({ label }) => sizes.multiplier === label)?.value,
    checked: pizza_sizes.find(({ label }) => sizes.multiplier === label)?.checked,
  };
}

// Нормализация массыва с типом соуса пиццы.
export const normalizeSauce = sauces => {
  return {
    ...sauces,
    type: pizza_sauces.find(({ label }) => sauces.name === label)?.value,
    checked: pizza_sauces.find(({ label }) => sauces.name === label)?.checked,
  };
}

// Нормализация массыва с ингредиентами пиццы.
export const normalizeIngredients = ings => {
  return {
    ...ings,
    type: pizza_ingredients.find(({ name }) => ings.name === name)?.value,
    counter: 0,
  }
}
