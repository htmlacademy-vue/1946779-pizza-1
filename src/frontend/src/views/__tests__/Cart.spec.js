import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';

import Vuex from 'vuex';
import Cart from '@/views/Cart.vue';
import AppButton from '@/common/components/AppButton';

import user from '@/static/user';
import misc from '@/static/misc';
import { normalizeMisc } from '@/common/helpers';


// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();

// Добавляем в него Vuex.
localVue.use(Vuex);
localVue.component('AppButton', AppButton);

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

// Создаём вспомогательный метод для добавления ADDRESSES в тест-хранилище.
const addresses = [
  {
    building:"1",
    comment:":LKJ:LKJ:LKJ:LKJ:LKJ:LKJ:KLJ:LKJ:LKJ:LKJ",
    flat:"1",
    id:"1",
    name:"newAddressStreet",
    street:"Street",
    userId:"8170e005-e25d-411e-9a87-d6dca201f9ab",
  }
];
const addressesSet = store => {
  store.commit("Auth/GET_ADDRESS", addresses);
}

describe('Cart', () => {
  const stubs = [
    'router-view',
    'router-link'
  ];
  let routerPush;
  let actions;
  let getters
  let store;
  let commit;
  let dispatch;
  let wrapper;

  const createComponent = options => {
    wrapper = mount(Cart, options);
  };

  const mocks = {
    $store: {
      commit,
      dispatch
    },
    $router: {
      push: routerPush
    },
  };

  beforeEach(() => {
    dispatch = jest.fn();
    routerPush = jest.fn();
    actions = {
      Orders: {
        post: jest.fn(),
      }
    };
    getters = {
      finalPrice: () => {
        let allPizzasPrice = 0;

        pizzas.forEach( element => {
          allPizzasPrice += element.price * element.count;
        });

        let allMiscsPrice = 0;
        miscs.forEach( el => {
          allMiscsPrice += el.price * el.initialCounter;
        });

        return (allPizzasPrice + allMiscsPrice);
      }
    };
    store = generateMockStore(actions);
    mocks.$router.push = routerPush;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('doesn\'t render sheet div', () => {
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    const sheet = wrapper.findAll('[data-test="sheet"]');
    expect(sheet.exists()).toBeFalsy();
  });

  it ('render sheet div', () => {
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    const sheet = wrapper.findAll('[data-test="sheet"]');
    expect(sheet.exists()).toBeTruthy();
  });

  it ('render sheet cart__empty div', () => {
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    const cartEmpty = wrapper.find('[ data-test="cart-empty"]');
    expect(cartEmpty.exists()).toBeTruthy();
  });

  it ('doesn\'t render sheet cart__empty div', () => {
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    const cartEmpty = wrapper.find('[ data-test="cart-empty"]');
    expect(cartEmpty.exists()).toBeFalsy();
  });

  it ('render sheet div', () => {
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    const pizzaItem = wrapper.findAll('[data-test="pizza"]');
    expect(pizzaItem.exists()).toBeTruthy();
    expect(Array.from(pizzaItem).length).toEqual(pizzas.length);
  });

  it ('display rendered additionals divs', () => {
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    const additionals = wrapper.find('[data-test="additionals"]');
    expect(additionals.isVisible()).toBe(true);
  });

  it ('doesn\'t display additionals divs', () => {
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    const additionals = wrapper.find('[data-test="additionals"]');
    expect(additionals.isVisible()).toBe(false);
  });

  it ('is rendered additional divs', () => {
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    const additional = wrapper.findAll('[data-test="additional"]');
    expect(Array.from(additional).length).toEqual(miscs.length);
  });

  it ('doesn\'t display form', () => {
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    const form = wrapper.findAll('[data-test="form"]');
    expect(form.isVisible()).toBe(false);
  });

  it ('display form', () => {
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    const form = wrapper.findAll('[data-test="form"]');
    expect(form.isVisible()).toBe(true);
  });

  it ('is rendered auth-form divs', () => {
    authenticateUser(store);
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    const authForm = wrapper.findAll('[data-test="auth-form"]');
    expect(authForm.exists()).toBeTruthy();
  });

  it ('doesn\'t render auth-form divs', () => {
    // authenticateUser(store);
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    const authForm = wrapper.findAll('[data-test="auth-form"]');
    expect(authForm.exists()).toBeFalsy();
  });

  it ('select on set \'myself\' in auth-form ', async () => {
    authenticateUser(store);
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });

    // rengered form form AUTH==================
    const authForm = wrapper.findAll('[data-test="auth-form"]');
    expect(authForm.exists()).toBeTruthy();
    //==========================================

    // finded select, select value and options in AUTH page======
    const select = wrapper.find('[data-test="auth-select"]');
    const options = wrapper.find('[data-test="auth-select"]').findAll('option')
    const selectValue = wrapper.find('[data-test="auth-select"]').element.value;
    // ==========================================================

    await select.trigger('change');

    // address values =============================================
    let streetValue =wrapper.find('[data-test="input-street"]').element.value;
    let houseValue =wrapper.find('[data-test="input-house"]').element.value;
    let apartmentValue =wrapper.find('[data-test="input-apartment"]').element.value;
    //=============================================================

    expect(streetValue).toBe('');
    expect(houseValue).toBe('');
    expect(apartmentValue).toBe('');
  });

  it ('select on set \'new\' in auth-form ', async () => {
    authenticateUser(store);
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });

    // set new data for <orderWay>:=============
    await wrapper.setData({ orderWay: 'new' });
    // =========================================

    // rengered form form AUTH==================
    const authForm = wrapper.findAll('[data-test="auth-form"]');
    expect(authForm.exists()).toBeTruthy();
    //==========================================

    // finded select, select value and options in AUTH page======
    const select = wrapper.find('[data-test="auth-select"]');
    const options = wrapper.find('[data-test="auth-select"]').findAll('option')
    const selectValue = wrapper.find('[data-test="auth-select"]').element.value;
    // ==========================================================

    // const optionValueNew = wrapper.find('[data-test="option-new"]');


    await select.trigger('change');

    // address values =============================================
    let streetValue =wrapper.find('[data-test="input-street"]').element.value;
    let houseValue =wrapper.find('[data-test="input-house"]').element.value;
    let apartmentValue =wrapper.find('[data-test="input-apartment"]').element.value;
    //=============================================================

    expect(streetValue).toBe('');
    expect(houseValue).toBe('');
    expect(apartmentValue).toBe('');
  });

  it ('is select option address render \'address\' in auth-form ', async () => {
    authenticateUser(store);
    setPizza(store);
    addressesSet(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });

    const optionAddress = wrapper.find('[data-test="option-address"]');
    expect(optionAddress.attributes('value')).toEqual(addresses[0].id);
  });

  it ('select on set \'address\' in auth-form ', async () => {
    authenticateUser(store);
    addressesSet(store);
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });

    // set new data for <orderWay>:=============
    await wrapper.setData({ orderWay: addresses[0].id });
    // =========================================

    // rengered form form AUTH==================
    const authForm = wrapper.findAll('[data-test="auth-form"]');
    expect(authForm.exists()).toBeTruthy();
    //==========================================

    // finded select, select value and options in AUTH page======
    const select = wrapper.find('[data-test="auth-select"]');
    const options = wrapper.find('[data-test="auth-select"]').findAll('option');
    const selectValue = wrapper.find('[data-test="auth-select"]').element.value;
    const optionAddress = wrapper.find('[data-test="option-address"]');
    // ==========================================================

    // await options.at(1).setSelected();
    await select.trigger('change');
    // console.log(selectValue);

    // address values =============================================
    let streetValue =wrapper.find('[data-test="input-street"]').element.value;
    let houseValue =wrapper.find('[data-test="input-house"]').element.value;
    let apartmentValue =wrapper.find('[data-test="input-apartment"]').element.value;
    //=============================================================

    expect(streetValue).toEqual(addresses[0].street);
    expect(houseValue).toEqual(addresses[0].building);
    expect(apartmentValue).toEqual(addresses[0].flat);
  });

  it ('does render notAuth-form divs', () => {
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    const notAuthForm = wrapper.findAll('[data-test="notAuth-form"]');
    expect(notAuthForm.exists()).toBeTruthy();
  });

  it ('is link to home ', () => {
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    const routerLink = wrapper.find('[data-test="route-link"]');
    expect(routerLink.exists()).toBeTruthy();
    expect(routerLink.attributes('to')).toBe('/');
  });

  it ('is finalPrice setting from getter', () => {
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    const finalPriceDiv = wrapper.find('[data-test="final-price"]');
    expect(finalPriceDiv.text()).toEqual(`Итого: ${getters.finalPrice()} ₽`);
  });

  it ('is final-button is disabled', () => {
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    const button = wrapper.find('[data-test="final-button"]');
    expect(button.attributes('disabled')).toBeFalsy();
  });

  it ('is popup is visiible', () => {
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    const popup = wrapper.find('[data-test="popup"]');
    expect(popup.isVisible()).toBeFalsy();
  });

  it ('calls the vuex mutation on final click', async () => {
    // authenticateUser(store);
    addressesSet(store);
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });

    await wrapper.find('[data-test="cart-submit"]').trigger('submit');

    expect(actions.Orders.post).toHaveBeenCalled();
  });

  it ('is popup is not visiible', async () => {
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    await wrapper.setData({ showPopup: true });
    const popup = wrapper.find('[data-test="popup"]');
    expect(popup.isVisible()).toBeTruthy();
  });

  it ('is final-button is call method addOrder with new orderWay', async () => {
    const spyOnAddOrder = jest.spyOn(Cart.methods, 'addOrder');
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    await wrapper.setData({ orderWay: 'new' });
    await wrapper.find('[data-test="cart-submit"]').trigger('submit');
    expect(spyOnAddOrder).toHaveBeenCalled();
  });

  it ('is final-button is call method addOrder with new orderWay', async () => {
    authenticateUser(store);
    const spyOnAddOrder = jest.spyOn(Cart.methods, 'addOrder');
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    await wrapper.setData({ orderWay: 'new' });
    await wrapper.find('[data-test="cart-submit"]').trigger('submit');
    expect(spyOnAddOrder).toHaveBeenCalled();
  });

  it ('is final-button is call method addOrder with myself orderWay without address', async () => {
    const spyOnAddOrder = jest.spyOn(Cart.methods, 'addOrder');
    authenticateUser(store);
    setPizza(store);
    createMiscs(store);
    // addressesSet(store);
    createComponent({ localVue, store, stubs });
    await wrapper.setData({ orderWay: 'myself' });
    await wrapper.find('[data-test="cart-submit"]').trigger('submit');
    expect(spyOnAddOrder).toHaveBeenCalled();
  });

  it ('is final-button is call method addOrder without orderWay', async () => {
    const spyOnAddOrder = jest.spyOn(Cart.methods, 'addOrder');
    authenticateUser(store);
    setPizza(store);
    createMiscs(store);
    addressesSet(store);
    createComponent({ localVue, store, stubs });
    await wrapper.setData({ orderWay: '1' });
    await wrapper.find('[data-test="cart-submit"]').trigger('submit');
    expect(spyOnAddOrder).toHaveBeenCalled();
  });

  it ('is final-button is call method addOrder with new orderWay without user', async () => {
    const spyOnAddOrder = jest.spyOn(Cart.methods, 'addOrder');
    setPizza(store);
    createMiscs(store);
    createComponent({ localVue, store, stubs });
    await wrapper.setData({ orderWay: 'new' });
    await wrapper.find('[data-test="cart-submit"]').trigger('submit');
    expect(spyOnAddOrder).toHaveBeenCalled();
  });
})


// Список элементов для тестирования
/*
v-if="pizzas.length < 1"
v-else
v-for="pizza in pizzas"
:pizza="pizza"
v-show="this.pizzas.length > 0"
v-for="misc in miscs"
:misc="misc"
v-show="this.pizzas.length > 0" (data-test="form")
v-if="isAuthenticated"
@change="selectOrderMethod($event.target.value)"
:value="address.id"
v-for="address in addresses"
v-show="showAddressForm"
:disabled="(orderWay !== 'new')"
to="/"
:disabled="finalPrice === 0"
v-show="showPopup"
    ...mapActions('Orders', {
      'addOrderToState': 'post'
    }),
*/

// Данные из тест хранилища
/*
    ...mapState('Auth', ['user', 'addresses']),
    ...mapState('Cart', ['miscs', 'pizzas', 'orderInfo']),
    ...mapGetters('Cart', ['finalPrice']),
    ...mapGetters('Auth', ['isAuthenticated']),
 */
