import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';
import Vuex from 'vuex';
import BuilderSauceSelector from '@/modules/builder/BuilderSauceSelector';

import pizza from '@/static/pizza';
import { normalizeSauce } from '@/common/helpers';

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();

// Добавляем в него Vuex.
localVue.use(Vuex);

const sauces = pizza.sauces.map( (item) => normalizeSauce(item));
const createSauces = store => {
  store.commit("Builder/SET_SAUCES", sauces);
};

// Начало блока тестов
describe('BuilderSauceSelector', () => {
  let wrapper;
  let store;
  let commit;
  let sendSauceData;
  let methods = {
    sendSauceData
  };

  const propsData = {
    sauce: {
      checked: false,
      id: 1,
      name: "Томатный",
      price: "50",
      type: "tomato",
    }
  };

  const mocks = {
    $store: {
      commit,
    },
    $methods: {
      methods
    }
  };

  const createComponent = options => {
    wrapper = mount(BuilderSauceSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    sendSauceData = jest.fn();
    mocks.$methods.methods = methods;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('component rendered', () => {
    createComponent({ store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it('input value attr is sauce.type', () => {
    createComponent({ store, propsData });
    const input = wrapper.find('input');
    expect(input.exists()).toBeTruthy();
    expect(input.attributes('value')).toBe(propsData.sauce.type);
  });

  it('input check is checked', () => {
    createComponent({ store, propsData });
    const input = wrapper.find('input');
    expect(input.exists()).toBeTruthy();
    expect(input.element.checked).toBe(propsData.sauce.checked);
  });

  it('input data-price is sauce.price', () => {
    createComponent({ store, propsData });
    const input = wrapper.find('input');
    expect(input.exists()).toBeTruthy();
    expect(input.attributes('data-price')).toBe(propsData.sauce.price);
  });

  it('span value  is sauce.name', () => {
    createComponent({ store, propsData });
    const span = wrapper.find('span');
    expect(span.exists()).toBeTruthy();
    expect(span.text()).toBe(propsData.sauce.name);
  });

  it('calls the vuex mutation is work', async () => {
    createSauces(store);
    createComponent({ store, propsData, mocks });
    const spyOnMutation = jest.spyOn(wrapper.vm, 'addSauce');
    const radio = wrapper.find('input[type="radio"]');
    radio.trigger('input');
    expect(spyOnMutation).toHaveBeenCalledWith({
      type: propsData.sauce.type,
      price: propsData.sauce.price,
      id: propsData.sauce.id
    });
  });
})

// Список элементов для тестирования
/*
:value="sauce.type"
:data-price="sauce.price"
@input="sendSauceData"
:checked="sauce.checked"
...mapMutations("Builder", { addSauce: "ADD_SAUCE" }),
*/

// Данные из тест хранилища
/*

 */
