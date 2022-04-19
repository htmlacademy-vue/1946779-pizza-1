import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';

import Vuex from 'vuex';
import OrderMainUnit from '@/modules/order/OrderMainUnit.vue';

import user from '@/static/user';
import pizza from '@/static/pizza';
import misc from '@/static/misc';
import { normalizeMisc, normalizeDough, normalizeSize, normalizeIngredients, normalizeSauce } from '@/common/helpers';

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();

// Добавляем в него Vuex.
localVue.use(Vuex);

// Создаём вспомогательный метод для аутентификации пользователя
const authenticateUser = store => {
  store.commit("Auth/SET_USER", user);
  store.commit("Auth/SET_AUTH", true);
};

// Создаём вспомогательный метод для добавления MISC в тест-хранилище.
const miscs = misc.map( (item) => normalizeMisc(item));
const createMiscs = store => {
  store.commit("Cart/SET_MISCS", miscs);
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

// Создаём вспомогательный метод для добавления ADDRESSES в тест-хранилище.
const addresses = [
  {
    building:"1",
    comment:":LKJ:LKJ:LKJ:LKJ:LKJ:LKJ:KLJ:LKJ:LKJ:LKJ",
    flat:"1",
    id:"1",
    name:"newAddressStreet",
    street:"Street",
    userId:"8170e005-e25d-411e-9a87-d6dca201f9ab",
  }
];
const addressesSet = store => {
  store.commit("Auth/GET_ADDRESS", addresses);
}

// Создаём вспомогательный метод для добавления ORDERS в тест-хранилище.
let orders = [
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

describe('OrderMainUnit', () => {
  let actions;
  let store;
  let commit;
  let wrapper;

  let propsData = {
    order: orders[0]
  };

  const createComponent = options => {
    wrapper = mount(OrderMainUnit, options);
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
    authenticateUser(store);
    addressesSet(store);

    createDoughs(store);
    createSizes(store);
    createIngredients(store);
    createSauces(store);
    createMiscs(store);

    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is pizzas item rendered', () => {
    authenticateUser(store);
    addressesSet(store);

    createDoughs(store);
    createSizes(store);
    createIngredients(store);
    createSauces(store);
    createMiscs(store);

    createComponent({ localVue, store, propsData });
    const pizzaItems = wrapper.findAll('[data-test="pizzas-item"]');
    expect(Array.from(pizzaItems).length).toEqual(propsData.order.orderPizzas.length);
  });

  it ('is miscs item rendered', () => {
    authenticateUser(store);
    addressesSet(store);

    createDoughs(store);
    createSizes(store);
    createIngredients(store);
    createSauces(store);
    createMiscs(store);

    createComponent({ localVue, store, propsData });
    const miscsItems = wrapper.findAll('[data-test="additionals-item"]');
    expect(Array.from(miscsItems).length).toEqual(propsData.order.orderMisc.length);
  });

  it ('is displayed OLD order address', () => {
    authenticateUser(store);
    addressesSet(store);

    createDoughs(store);
    createSizes(store);
    createIngredients(store);
    createSauces(store);
    createMiscs(store);

    createComponent({ localVue, store, propsData });
    const oldAddressHTML = wrapper.findAll('[data-test="order-address-old"]');
    const emptyAddressHTML = wrapper.findAll('[data-test="order-address-empty"]');
    const newAddressHTML = wrapper.findAll('[data-test="order-address-new"]');
    expect(oldAddressHTML.exists()).toBeTruthy();
    expect(emptyAddressHTML.exists()).toBeFalsy();
    expect(newAddressHTML.exists()).toBeFalsy();
  });

  it ('is displayed Empty order address', () => {
    let orders = [
      {
        "id": 1,
        "phone": "+777 777 777",
        "userId": "7bba7ab7-fcad-4708-b41a-3cadf50edd8d",
        "addressId": null,
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

    let propsData = {
      order: orders[0]
    };

    authenticateUser(store);
    addressesSet(store);

    createDoughs(store);
    createSizes(store);
    createIngredients(store);
    createSauces(store);
    createMiscs(store);

    createComponent({ localVue, store, propsData });
    const oldAddressHTML = wrapper.findAll('[data-test="order-address-old"]');
    const emptyAddressHTML = wrapper.findAll('[data-test="order-address-empty"]');
    const newAddressHTML = wrapper.findAll('[data-test="order-address-new"]');
    expect(oldAddressHTML.exists()).toBeFalsy();
    expect(emptyAddressHTML.exists()).toBeTruthy();
    expect(newAddressHTML.exists()).toBeFalsy();
  });

  it ('is displayed Empty order address', () => {
    let orders = [
      {
        "id": 1,
        "phone": "+777 777 777",
        "userId": "7bba7ab7-fcad-4708-b41a-3cadf50edd8d",
        "addressId": undefined,
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

    let propsData = {
      order: orders[0]
    };

    authenticateUser(store);
    addressesSet(store);

    createDoughs(store);
    createSizes(store);
    createIngredients(store);
    createSauces(store);
    createMiscs(store);

    createComponent({ localVue, store, propsData });
    const oldAddressHTML = wrapper.findAll('[data-test="order-address-old"]');
    const emptyAddressHTML = wrapper.findAll('[data-test="order-address-empty"]');
    const newAddressHTML = wrapper.findAll('[data-test="order-address-new"]');
    expect(oldAddressHTML.exists()).toBeFalsy();
    expect(emptyAddressHTML.exists()).toBeFalsy();
    expect(newAddressHTML.exists()).toBeTruthy();
  });
})

// Список элементов для тестирования
/*
v-for="ing in ings"
:alt="pizza.name
*/

// Данные из тест хранилища
/*
    ...mapState('Auth', ['user', 'addresses']),
    ...mapState("Builder", ['sizes', 'doughs', 'sauces', 'ingredients']),
    ...mapState("Cart", ['miscs']),
 */
