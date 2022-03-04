import { dough_types, pizza_sizes, pizza_sauces, pizza_ingredients, misc_types } from "@/common/constants";

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

// Нормализация массыва с допами.
export const normalizeMisc = misc => {
  return {
    ...misc,
    initialCounter: misc_types.find(({ name }) => misc.name === name)?.initialCounter,
    svgName: misc_types.find(({ name }) => misc.name === name)?.svg,
  };
};

// парсинг ингередиентов для корзины:
export const parsePizzaInfo = ingredientInfo => {
  let ingredientList = [];
  ingredientInfo.forEach( ingredients => {
    let igredient = ingredients.name;
    ingredientList.push(igredient);
  });
  return ingredientList;
}

// парсинг цены ингредиентов:
export const parsePizzaCost = pizzasInfoArray => {
  let costsList = [];
  var initialValue = 0;
  pizzasInfoArray.forEach( pizzaInfo => {
    let price = pizzaInfo.pizza_price;
    costsList.push(price);
  });
  return costsList.reduce(function(a, b) {
    return a + b;
  }, initialValue);
}
