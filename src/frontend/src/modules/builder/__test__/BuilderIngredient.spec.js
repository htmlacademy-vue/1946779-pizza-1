import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';
import Vuex from 'vuex';
import BuilderIngredient from '@/modules/builder/BuilderIngredient';
import BuilderItemCounter from '@/modules/builder/BuilderItemCounter';
import AppDrag from '@/common/components/AppDrag';
import pizza from '@/static/pizza';
import { normalizeIngredients } from '@/common/helpers';

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();

// Добавляем в него Vuex.
localVue.use(Vuex);
localVue.component('AppDrag', AppDrag);
localVue.component('BuilderItemCounter', BuilderItemCounter);

const ingredients = pizza.ingredients.map( (item) => normalizeIngredients(item));
const createIngredients = store => {
  store.commit("Builder/SET_INGREDIENTS", ingredients);
};

// Начало блока тестов
describe('BuilderIngredient', () => {
  let wrapper;
  let store;
  let commit;
  let dispatch;
  let actions;

  const propsData = {
    ingredient: ingredients[0]
  };

  const mocks = {
    $store: {
      commit,
      dispatch,
    },
  };

  const createComponent = options => {
    wrapper = mount(BuilderIngredient, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        addIngredients: jest.fn(),
      }
    };
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('component rendered', () => {
    createComponent({ store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it('shows type attr class', () => {
    createComponent({ store, propsData });
    const filling = wrapper.find('[data-test="filling"]');
    expect(filling.exists()).toBeTruthy();
    expect(filling.attributes('class')).toContain('filling filling--mushrooms');
  });

  it ('calls countIngredient', async () => {
    createIngredients(store);
    createComponent({ localVue, store, propsData });
    const itemCounter = wrapper.findComponent(BuilderItemCounter);
    const spyOnCountIngredient = jest.spyOn(wrapper.vm, 'addIngredients');
    await itemCounter.vm.$emit('countIngredient', 1);
    expect(spyOnCountIngredient).toHaveBeenCalled();
  });
})
