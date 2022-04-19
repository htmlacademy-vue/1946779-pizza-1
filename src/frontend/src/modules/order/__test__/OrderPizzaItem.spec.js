import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';

import Vuex from 'vuex';
import OrderPizzaItem from '@/modules/order/OrderPizzaItem.vue';

import user from '@/static/user';
import pizza from '@/static/pizza';
import { normalizeDough, normalizeSize, normalizeIngredients, normalizeSauce } from '@/common/helpers';

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();

// Добавляем в него Vuex.
localVue.use(Vuex);

// Создаём вспомогательный метод для аутентификации пользователя
const authenticateUser = store => {
  store.commit("Auth/SET_USER", user);
  store.commit("Auth/SET_AUTH", true);
};

// Создаём вспомогательный метод для добавления DOUGHS в тест-хранилище.
const doughs = pizza.dough.map( (item) => normalizeDough(item));
const createDoughs = store => {
  store.commit("Builder/SET_DOUGHS", doughs);
};

// Создаём вспомогательный метод для добавления SIZES в тест-хранилище.
const sizes = pizza.sizes.map( (item) => normalizeSize(item));
const createSizes = store => {
  store.commit("Builder/SET_SIZES", sizes);
};

// Создаём вспомогательный метод для добавления INGS в тест-хранилище.
const ingredients = pizza.ingredients.map( (item) => normalizeIngredients(item));
const createIngredients = store => {
  store.commit("Builder/SET_INGREDIENTS", ingredients);
};

// Создаём вспомогательный метод для добавления SAUCES в тест-хранилище.
const sauces = pizza.sauces.map( (item) => normalizeSauce(item));
const createSauces = store => {
  store.commit("Builder/SET_SAUCES", sauces);
};

// Создаём вспомогательный метод для добавления ORDERS в тест-хранилище.
const orders = [
  {
    "id": 1,
    "phone": "+777 777 777",
    "userId": "7bba7ab7-fcad-4708-b41a-3cadf50edd8d",
    "addressId": 1,
    "orderPizzas": [
      {
        "id": 1,
        "name": "asd",
        "quantity": 1,
        "sauceId": 2,
        "doughId": 2,
        "sizeId": 1,
        "orderId": 1,
        "ingredients": [
          {
            "id": 1,
            "quantity": 1,
            "pizzaId": 1,
            "ingredientId": 4
          }
        ]
      }
    ],
    "orderMisc": [
      {
        "id": 1,
        "quantity": 0,
        "orderId": 1,
        "miscId": 1
      },
      {
        "id": 2,
        "quantity": 0,
        "orderId": 1,
        "miscId": 2
      },
      {
        "id": 3,
        "quantity": 0,
        "orderId": 1,
        "miscId": 3
      }
    ],
    "orderAddress": {
      "id": 1,
      "name": "ул.asd, д.1, кв.1",
      "street": "asd",
      "building": "1",
      "flat": "1",
      "comment": "",
      "userId": "7bba7ab7-fcad-4708-b41a-3cadf50edd8d"
    }
  }
];
const ordersSet = store => {
  store.commit("Orders/ADD_ORDERS", orders);
}

describe('OrderPizzaItem', () => {
  let actions;
  let store;
  let commit;
  let wrapper;

  let propsData = {
    pizza: orders[0].orderPizzas[0]
  };

  const createComponent = options => {
    wrapper = mount(OrderPizzaItem, options);
  };

  const mocks = {
    $store: {
      commit
    }
  };

  beforeEach(() => {
    actions = {
      Orders: {
        post: jest.fn(),
        query: jest.fn(),
      }
    };
    store = generateMockStore(actions);
    mocks.$store.commit = commit;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createDoughs(store);
    createSizes(store);
    createIngredients(store);
    createSauces(store);
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is ingredients list is rendered', () => {
    createDoughs(store);
    createSizes(store);
    createIngredients(store);
    createSauces(store);
    createComponent({ localVue, store, propsData });
    const ingsHTML = wrapper.findAll('[data-test="ings"]');
    expect(Array.from(ingsHTML).length).toEqual(orders[0].orderPizzas[0].ingredients.length);
  });

  it ('is ingredients list is rendered', () => {
    createDoughs(store);
    createSizes(store);
    createIngredients(store);
    createSauces(store);
    createComponent({ localVue, store, propsData });
    const imgHTML = wrapper.find('[data-test="img"]');
    expect(imgHTML.attributes('alt')).toBe(orders[0].orderPizzas[0].name);
  });
})

// Список элементов для тестирования
/*
v-for="ing in ings"
:alt="pizza.name
*/

// Данные из тест хранилища
/*
...mapState("Builder", ['sizes', 'doughs', 'sauces', 'ingredients'])
 */
