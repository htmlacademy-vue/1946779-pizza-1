import { dough_types, pizza_sizes, pizza_sauces, pizza_ingredients } from "@/common/constants";

// Нормализация массыва с видом теста.
export const normalizeDough = dough => {
  return {
    ...dough,
    type: dough_types.find(({ label }) => dough.name === label)?.value,
  };
};

// Нормализация массыва с размером пиццы.
export const normalizeSize = sizes => {
  return {
    ...sizes,
    size: pizza_sizes.find(({ label }) => sizes.multiplier === label)?.value,
  };
}

// Нормализация массыва с типом соуса пиццы.
export const normalizeSauce = sauces => {
  return {
    ...sauces,
    sauce: pizza_sauces.find(({ label }) => sauces.name === label)?.value,
  };
}

// Нормализация массыва с ингредиентами пиццы.
export const normalizeIngredients = ings => {
  return {
    ...ings,
    ing: pizza_ingredients.find(({ name }) => ings.name === name)?.value,
  }
}
