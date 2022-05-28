import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';

import Vuex from 'vuex';
import CartPizzaItem from '@/modules/cart/CartPizzaItem.vue';
// import CartItemCounter from '@/modules/cart/CartItemCounter.vue';

import user from '@/static/user';
import misc from '@/static/misc';
import { normalizeMisc } from '@/common/helpers';

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

describe('CartPizzaItem', () => {
  const stubs = [
    'router-view',
    'router-link'
  ];
  let routerPush;
  let actions;
  let store;
  let commit;
  let wrapper;


  const propsData = {
    pizza: pizzas[0]
  }
  const createComponent = options => {
    wrapper = mount(CartPizzaItem, options);
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
        setChangingPizza: jest.fn(),
      },
      Cart: {
        addPizzaCount: jest.fn(),
      }
    };
    store = generateMockStore(actions);
    mocks.$router.push = routerPush;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is ingredients rendered', () => {
    createComponent({ localVue, store, propsData });
    const ingredients = wrapper.findAll('[ data-test="ingredient"]');
    expect(ingredients.exists()).toBeTruthy();
    expect(Array.from(ingredients).length).toEqual(propsData.pizza.ingredients.length);
  });

  it ('is pizza-count is render', () => {
    createComponent({ localVue, store, propsData });
    const pizzaItem = wrapper.findAll('[data-test="pizza-count"]');
    expect(pizzaItem.exists()).toBeTruthy();
    expect(Array.from(pizzaItem).length).toEqual(propsData.pizza.count);
  });

  it ('is pizza-count component is emit', async () => {
    setPizza(store);
    createComponent({ localVue, store, propsData });
    const pizzaItem = wrapper.find('[data-test="pizza-count"]');
    const spyOnCatchCounter = jest.spyOn(wrapper.vm, 'addPizzaCount');
    await pizzaItem.vm.$emit('sendCount', 1);
    expect(spyOnCatchCounter).toHaveBeenCalled();
  });

  it ('is change btn is work', async () => {
    setPizza(store);
    createComponent({ localVue, store, propsData, mocks });
    const changeBtn = wrapper.find('[data-test="change-btn"]');
    await changeBtn.trigger('click');
    expect(actions.Builder.setChangingPizza).toHaveBeenCalled();
    expect(routerPush).toHaveBeenCalled();
  });
});

// Список элементов для тестирования
/*
v-for="ingredient in ingredients"
@sendCount="catchCounter"
@click="changeIngredients"

...mapActions('Cart', ['addPizzaCount']),
...mapActions('Builder', ['setChangingPizza']),
*/

// Данные из тест хранилища
/*
    ...mapState('Auth', ['user', 'addresses']),
    ...mapState('Cart', ['miscs', 'pizzas', 'orderInfo']),
    ...mapGetters('Cart', ['finalPrice']),
    ...mapGetters('Auth', ['isAuthenticated']),
 */
