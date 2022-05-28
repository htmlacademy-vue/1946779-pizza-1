import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';

import Vuex from 'vuex';
import CartItemCounter from '@/modules/cart/CartItemCounter.vue';

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();

// Добавляем в него Vuex.
localVue.use(Vuex);

let pizzas = [
  {
    count:1,
    dough: {
      id:1,
      price:300,
      type:"small",
    },
    id:"1",
    ingredients: [
      {
        counter:2,
        id:4,
        image:"/public/img/filling/salmon.svg",
        name:"Лосось",
        price:50,
        type:"salmon",
      },
    ],
    pizzaName: "new",
    price: 400,
    sauce: {
      id:2,
      price:50,
      type:"creamy",
    },
    size: {
      checked:true,
      id:1,
      image:"/public/img/diameter.svg",
      multiplier:1,
      name:"23 см",
      type:"small",
    }
  }
];
const setPizza = store => {
  pizzas.forEach( pizza => {
    store.commit("Cart/SET_PIZZA", pizza);
  })
};

describe('CartItemCounter', () => {
  let actions;
  let store;
  let commit;
  let wrapper;

  let propsData = {
    counter: 0
  };

  const createComponent = options => {
    wrapper = mount(CartItemCounter, options);
  };

  const mocks = {
    $store: {
      commit,
    },
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ localVue, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is input value are equal prop counter', () => {
    createComponent({ localVue, propsData });
    const input = wrapper.find('[data-test="input"]');
    expect(input.element.value).toEqual(`${propsData.counter}`);
  });

  it ('is minus button is disabled', () => {
    createComponent({ localVue, propsData });
    const btn = wrapper.find('[data-test="minus-btn"]');
    expect(btn.element.disabled).toBeTruthy();
  });

  it ('is minus button is enabled', () => {
    propsData = {
      counter: 1
    };
    createComponent({ localVue, propsData });
    const btn = wrapper.find('[data-test="minus-btn"]');
    expect(btn.element.disabled).toBeFalsy();
  });

  it ('is minus button is emit click', async () => {
    createComponent({ localVue, propsData });
    const btn = wrapper.find('[data-test="minus-btn"]');
    await btn.trigger('click');
    expect(wrapper.emitted().sendCount[0][0]).toEqual(propsData.counter - 1);
  });

  it ('is plus button is emit click', async () => {
    createComponent({ localVue, propsData });
    const btn = wrapper.find('[data-test="plus-btn"]');
    await btn.trigger('click');
    expect(wrapper.emitted().sendCount[0][0]).toEqual(propsData.counter + 1);
  });
})


// Список элементов для тестирования
/*
@click="$emit('sendCount', counter - 1)"
:disabled="counter < 1"
:value="counter"
@click="$emit('sendCount', counter + 1)"
*/
