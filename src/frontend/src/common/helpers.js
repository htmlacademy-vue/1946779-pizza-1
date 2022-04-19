import resources from '@/common/enums/resources';
import {
  AuthApiService,
  CrudApiService,
  ReadOnlyApiService,
  IngredientApiService,
  SauceApiService,
  DoughApiService,
  SizeApiService,
  MiscApiService,
  OrdersApiService,
  AddressApiService
} from '@/services/api.service';
import { dough_types, pizza_sizes, pizza_sauces, pizza_ingredients, misc_types  } from '@/common/constants';


export const createResources = notifier => {
  return {
    [resources.USERS]:
      new ReadOnlyApiService(resources.USERS, notifier),
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.INGREDIENT]: new IngredientApiService(notifier),
    [resources.SAUCE]: new SauceApiService(notifier),
    [resources.DOUGH]: new DoughApiService(notifier),
    [resources.SIZE]: new SizeApiService(notifier),
    [resources.MISC]: new MiscApiService(notifier),

    [resources.ORDER]: new OrdersApiService(notifier),
    [resources.ADDRESS]: new AddressApiService(notifier),
  };
};

export const setAuth = store => {
  store.$api.auth.setAuthHeader();
  store.dispatch('Auth/getMe');
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
    let price = pizzaInfo.price;
    costsList.push(price);
  });
  return costsList.reduce(function(a, b) {
    return a + b;
  }, initialValue);
}

export const createPizzasRequestObj = (pizzas) => {
  const parsePizzas = [];
  pizzas.forEach( pizza => {
    parsePizzas.push({
      "name": pizza.pizzaName,
      "sauceId": pizza.sauce.id,
      "doughId": pizza.dough.id,
      "sizeId": pizza.size.id,
      "quantity": pizza.count,
      "ingredients": parseIngredients(pizza.ingredients),
    })
  });

  function parseIngredients(ings = []) {
    const parsedIngs = [];
    ings.forEach( ing => {
      parsedIngs.push({
        "ingredientId": ing.id,
        "quantity": ing.counter
      })
    });
    return parsedIngs;
  }

  return parsePizzas;
}

export const createMiscRequestObj = (misc) => {
  const parsedMisc= [];
  misc.forEach( m => {
    parsedMisc.push({
      "miscId": m.id,
      "quantity": m.initialCounter
    })
  });
  return parsedMisc;
}

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
