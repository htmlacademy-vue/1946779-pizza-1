import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';

import user from '@/static/user';
import { logout } from '@/common/mixins';
import AppLayoutHeader from '@/layouts/AppLayoutHeader.vue';

const localVue = createLocalVue();
// Создаём вспомогательный метод для аутентификации пользователя
const authenticateUser = store => {
  store.commit("Auth/SET_USER", user);
  store.commit("Auth/SET_AUTH", true);
};

// Создаём вспомогательный метод для добавления PIZZA в тест-хранилище.
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

describe('AppLayoutHeader', () => {
  const stubs = ['router-link'];
  let wrapper;
  let store;
  let commit;
  let actions;

  let propsData = {
    user: user,
  };

  const mocks = {
    $store: {
      commit,
    },
    $router: {
      push: jest.fn()
    },
    $notifier: {
      success: jest.fn()
    }
  };

  const createComponent = options => {
    wrapper = mount(AppLayoutHeader, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        logout: jest.fn()
      }
    };
    mocks.$notifier.success = jest.fn();
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ propsData, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is price in cart is displayed', () => {
    setPizza(store);
    createComponent({ propsData, store, stubs });
    const cart = wrapper.find('[data-test="cart-full"]');
    expect(cart.exists()).toBeTruthy();
  });

  it ('is price in cart is not displayed', () => {
    // setPizza(store);
    createComponent({ propsData, store, stubs });
    const cart = wrapper.find('[data-test="cart-full"]');
    expect(cart.exists()).toBeFalsy();
  });

  it ('is empty cart is displayed', () => {
    // setPizza(store);
    createComponent({ propsData, store, stubs });
    const cart = wrapper.find('[data-test="cart-empty"]');
    expect(cart.exists()).toBeTruthy();
  });

  it ('is empty cart is not displayed', () => {
    setPizza(store);
    createComponent({ propsData, store, stubs });
    const cart = wrapper.find('[data-test="cart-empty"]');
    expect(cart.exists()).toBeFalsy();
  });

  it ('is header auth user is displayed', () => {
    authenticateUser(store);
    createComponent({ propsData, store, stubs });
    const user = wrapper.find('[data-test="user-auth"]');
    expect(user.exists()).toBeTruthy();
  });

  it ('is picture attribut srcset is from props', () => {
    authenticateUser(store);
    createComponent({ propsData, store, stubs });
    const picture = wrapper.find('[data-test="picture-source"]');
    expect(picture.attributes('srcset')).toBe(propsData.user.avatar);
  });

  it ('is img attribut src is from props', () => {
    authenticateUser(store);
    createComponent({ propsData, store, stubs });
    const img = wrapper.find('[data-test="img-source"]');
    expect(img.attributes('src')).toBe(propsData.user.avatar);
  });

  it ('is link logout is work', async () => {
    authenticateUser(store);
    createComponent({ localVue, propsData, store, stubs, mocks });
    const link = wrapper.find('[data-test="logout-link"]');
    await link.trigger('click');
    expect(actions.Auth.logout).toHaveBeenCalled();
    expect(mocks.$notifier.success).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith('/login');
  });

  it ('is header non-auth user is displayed', () => {
    // authenticateUser(store);
    createComponent({ propsData, store, stubs });
    const user = wrapper.find('[data-test="user-not-auth"]');
    expect(user.exists()).toBeTruthy();
  });

  it ('is header non-auth user is not displayed', () => {
    authenticateUser(store);
    createComponent({ propsData, store, stubs });
    const user = wrapper.find('[data-test="user-not-auth"]');
    expect(user.exists()).toBeFalsy();
  });
})
