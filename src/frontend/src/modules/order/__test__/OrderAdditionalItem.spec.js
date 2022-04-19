import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';

import Vuex from 'vuex';
import OrderAdditionalItem from '@/modules/order/OrderAdditionalItem.vue';

import misc from '@/static/misc';
import { normalizeMisc, normalizeDough, normalizeSize, normalizeIngredients, normalizeSauce } from '@/common/helpers';

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();

// Добавляем в него Vuex.
localVue.use(Vuex);

// Создаём вспомогательный метод для добавления MISC в тест-хранилище.
const miscs = misc.map( (item) => normalizeMisc(item));
const createMiscs = store => {
  store.commit("Cart/SET_MISCS", miscs);
};

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

describe('OrderAdditionalItem', () => {
  let store;
  let wrapper;

  let propsData = {
    misc: orders[0].orderMisc[0]
  };

  const createComponent = options => {
    wrapper = mount(OrderAdditionalItem, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createMiscs(store);
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is attribut alt of img  from getter', () => {
    createMiscs(store);
    createComponent({ localVue, store, propsData });
    const miscImg = wrapper.find('[data-test="misc-img"]');
    expect(miscImg.attributes('alt')).toBe(miscs.find( el => orders[0].orderMisc[0].miscId === el.id)?.name);
  });

  it ('is misc name text value from getter', () => {
    createMiscs(store);
    createComponent({ localVue, store, propsData });
    const miscNameSpan = wrapper.find('[data-test="miscName-text"]');
    expect(miscNameSpan.text()).toBe(miscs.find( el => orders[0].orderMisc[0].miscId === el.id)?.name);
  });

  it ('is misc price text value from getter', () => {
    createMiscs(store);
    createComponent({ localVue, store, propsData });
    const miscPriceSpan = wrapper.find('[data-test="miscPrice-text"]');
    expect(miscPriceSpan.text()).toEqual(`${(miscs.find( el => orders[0].orderMisc[0].miscId === el.id)?.price)} ₽`);
  });

})
