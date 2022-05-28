import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';

import Vuex from 'vuex';
import Orders from '@/views/Orders.vue';

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();

// Добавляем в него Vuex.
localVue.use(Vuex);

// Создаём вспомогательный метод для добавления ORDERS в тест-хранилище.
const orders = [
  {
    "id": 1,
    "phone": "+777 777 777",
    "userId": "7bba7ab7-fcad-4708-b41a-3cadf50edd8d",
    "addressId": 1,
    orderPizzas: [
      {
        "id": 1,
        "name": "asd",
        "quantity": 1,
        "sauceId": 2,
        "doughId": 2,
        "sizeId": 1,
        "orderId": 1,
        ingredients: [
          {
            "id": 1,
            "quantity": 1,
            "pizzaId": 1,
            ingredientId: 4
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
]

const ordersSet = store => {
  store.commit("Orders/ADD_ORDERS", orders);
}

describe('Orders', () => {
  let actions;
  let store;
  let commit;
  let dispatch;
  let wrapper;

  const createComponent = options => {
    wrapper = mount(Orders, options);
  };

  const mocks = {
    $store: {
      commit,
      dispatch
    }
  };

  beforeEach(() => {
    dispatch = jest.fn();
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
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is  orders units rendered', () => {
    ordersSet(store);
    createComponent({ localVue, store, mocks });
    const orderUnit = wrapper.findAll('[data-test="order-unit"]');
    expect(Array.from(orderUnit).length).toEqual(orders.length);
  });

})
