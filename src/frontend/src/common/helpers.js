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
    let price = pizzaInfo.pizza_price;
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
