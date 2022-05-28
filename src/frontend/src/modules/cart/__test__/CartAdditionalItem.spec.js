import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';

import Vuex from 'vuex';
import CartAdditionalItem from '@/modules/cart/CartAdditionalItem.vue';

import misc from '@/static/misc';
import { normalizeMisc } from '@/common/helpers';

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();

// Добавляем в него Vuex.
localVue.use(Vuex);

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

describe('CartAdditionalItem', () => {
  const stubs = [
    'router-view',
    'router-link'
  ];
  let actions;
  let store;
  let commit;
  let wrapper;


  const propsData = {
    misc: miscs[0]
  };

  const createComponent = options => {
    wrapper = mount(CartAdditionalItem, options);
  };

  const mocks = {
    $store: {
      commit,
    }
  };

  beforeEach(() => {
    actions = {
      Cart: {
        addAdditional: jest.fn(),
      }
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is attribute alt is from prop', () => {
    createComponent({ localVue, store, propsData });
    const imgTag = wrapper.find('[data-test="img"]');
    expect(imgTag.attributes('alt')).toEqual(propsData.misc.name);
  });

  it ('is attribute src is from prop', () => {
    createComponent({ localVue, store, propsData });
    const imgTag = wrapper.find('[data-test="img"]');
    expect(imgTag.attributes('src')).toEqual(require(`@/assets/img/${propsData.misc.svgName}.svg`));
  });

  it ('is misc-count component is emit', async () => {
    setPizza(store);
    createComponent({ localVue, store, propsData });
    const miscItemCounter = wrapper.find('[data-test="misc-count"]');
    const spyOnAddAdditional = jest.spyOn(wrapper.vm, 'addAdditional');
    await miscItemCounter.vm.$emit('sendCount', 1);
    expect(spyOnAddAdditional).toHaveBeenCalledWith(
      // expect.any(Object),
      {
        id: propsData.misc.id,
        count: 1
      }
    );
  });
})

// Список элементов для тестирования
/*
:src="require(`@/assets/img/${misc.svgName}.svg`)"
:alt="misc.name"
@sendCount="sendCount"
...mapActions('Cart', ['addAdditional']),
*/
