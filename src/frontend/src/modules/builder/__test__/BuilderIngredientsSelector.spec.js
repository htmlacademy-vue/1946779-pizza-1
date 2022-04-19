import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';
import Vuex from 'vuex';
import pizza from '@/static/pizza';
import BuilderIngredientsSelector from '@/modules/builder/BuilderIngredientsSelector';
import { normalizeSauce, normalizeIngredients } from '@/common/helpers';

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();

// Добавляем в него Vuex.
localVue.use(Vuex);


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

// Начало блока тестов
describe('BuilderIngredientsSelector', () => {
  let wrapper;
  let store;
  let commit;
  let dispatch;

  const propsData = {

  };

  const mocks = {
    $store: {
      commit,
      dispatch,
    },
  };

  const createComponent = options => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('component rendered', () => {
    createComponent({ store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is rendered ingredients', () => {
    createIngredients(store);
    createComponent({ localVue, store });
    const ingrHTML = wrapper.findAll('[data-test="add-ingr"]');
    expect(Array.from(ingrHTML).length).toEqual(ingredients.length);
  });

  it ('is rendered sauces', () => {
    createSauces(store);
    createComponent({ localVue, store });
    const ingrHTML = wrapper.findAll('[data-test="add-sauce"]');
    expect(Array.from(ingrHTML).length).toEqual(sauces.length);
  });

})
