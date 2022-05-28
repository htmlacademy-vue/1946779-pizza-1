import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';

import user from '@/static/user';
import pizza from '@/static/pizza';
import { normalizeDough, normalizeSize } from '@/common/helpers';

import Vuex from 'vuex';
import Index from '@/views/Index.vue';

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();

// Добавляем в него Vuex.
localVue.use(Vuex);

// Создаём вспомогательный метод для аутентификации пользователя
const authenticateUser = store => {
  store.commit("Auth/SET_USER", user);
  store.commit("Auth/SET_AUTH", true);
};

// Создаём вспомогательный метод для создания пиццы:
const builderPizza = {
  count:1,
  dough: {
    id:1,
    price:300,
    type:"small",
  },
  id:"1",
  ingredients: [
    {
      counter:1,
      id:4,
      image:"/public/img/filling/salmon.svg",
      name:"Лосось",
      price:50,
      type:"salmon",
    }
  ],
  pizzaName:"new",
  price:0,
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
};

const setPizzaToBuildedPizza = store => {
  store.commit("Builder/SET_PIZZA_TO_CHANGE", builderPizza);
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

describe('Index', () => {
  const stubs = ['router-view'];
  let routerPush;
  let actions;
  let store;
  let commit;
  let wrapper;

  let ingr = {
    counter:0,
    id:1,
    image:"/public/img/filling/mushrooms.svg",
    name:"Грибы",
    price:33,
    type:"mushrooms",
  };

  const createComponent = options => {
    wrapper = mount(Index, options);
  };

  const mocks = {
    $store: {
      commit,
    },
    $router: {
      push: routerPush
    },
  };

  beforeEach(() => {
    routerPush = jest.fn();
    actions = {
      Builder: {
        addIngredients: jest.fn(),
        query: jest.fn(),
        dropIngredients: jest.fn()
      }
    };
    store = generateMockStore(actions);
    mocks.$store.commit = commit;
    mocks.$router.push = routerPush;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is rendered doughs', () => {
    createDoughs(store);
    createComponent({ localVue, store, stubs });
    const doughsHTML = wrapper.findAll('[data-test="add-dough"]');
    expect(Array.from(doughsHTML).length).toEqual(doughs.length);
  });

  it ('is rendered sizes', () => {
    createSizes(store);
    createComponent({ localVue, store, stubs });
    const sizesHTML = wrapper.findAll('[data-test="add-size"]');
    expect(Array.from(sizesHTML).length).toEqual(sizes.length);
  });

  it ('is BuilderIngredientsSelector exist', () => {
    createComponent({ localVue, store, stubs });
    const component = wrapper.find('[data-test="ingr-selector"]');
    expect(component.exists()).toBeTruthy();
  });

  it('working droped event', async () => {
    createComponent({ localVue, store, stubs });
    const dropElement = wrapper.find('[data-test="drop-elem"]');
    const spyOnMutation = jest.spyOn(wrapper.vm, 'dropIngredients');
    expect(dropElement.exists()).toBeTruthy();
    await dropElement.vm.$emit('drop');
    expect(spyOnMutation).toHaveBeenCalled();
  })

  it ('is button disabled', () => {
    createComponent({ localVue, store, stubs });
    const button = wrapper.find('[data-test="putPizza-button"]');
    expect(button.exists()).toBeTruthy();
    expect(button.attributes('disabled')).toBeTruthy();
  });

  it ('is button enable', () => {
    setPizzaToBuildedPizza(store);
    createComponent({ localVue, store, stubs });
    const button = wrapper.find('[data-test="putPizza-button"]');
    expect(button.exists()).toBeTruthy();
    expect(button.attributes('disabled')).toBeFalsy();
  });

  it ('is button click event work', async () => {
    setPizzaToBuildedPizza(store);
    createComponent({ localVue, store, mocks });
    const button = wrapper.find('[data-test="putPizza-button"]');
    expect(button.exists()).toBeTruthy();

    const spyOnAddPrice = jest.spyOn(wrapper.vm, 'addPrice');
    const spyOnSetPizza = jest.spyOn(wrapper.vm, 'setPizza');
    const spyOnResetState = jest.spyOn(wrapper.vm, 'resetState');

    await button.trigger('click');
    expect(spyOnAddPrice).toHaveBeenCalled();
    expect(spyOnSetPizza).toHaveBeenCalled();
    expect(spyOnResetState).toHaveBeenCalled();
    expect(actions.Builder.query).toHaveBeenCalled();
    expect(routerPush).toHaveBeenCalled();
  });
})


// Список элементов для тестирования
/*
 v-for="dough in doughs"
 v-for="size in sizes"
  @drop="dropIngr($event)"
  :disabled=" (buildedPizza.ingredients.length < 1) || (buildedPizza.pizzaName === '') "
  @click="putPizza"
  ...mapActions("Builder", ["addIngredients", 'query', "dropIngredients"]),
  ...mapMutations("Cart", { setPizza: 'SET_PIZZA' }),
*/

// Данные из тест хранилища
/*
...mapGetters("Builder", ["pricePizza"]),
...mapState("Builder", ['buildedPizza', 'sizes', 'doughs']),
 */
