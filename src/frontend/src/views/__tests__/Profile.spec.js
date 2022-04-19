import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';

import Vuex from 'vuex';
import Profile from '@/views/Profile.vue';

import user from '@/static/user';

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();

// Добавляем в него Vuex.
localVue.use(Vuex);

// Создаём вспомогательный метод для аутентификации пользователя
const authenticateUser = store => {
  store.commit("Auth/SET_USER", user);
  store.commit("Auth/SET_AUTH", true);
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

describe('Profile', () => {
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
  let editAddress;

  const createComponent = options => {
    wrapper = mount(Profile, options);
  };

  const mocks = {
    $store: {
      commit,
      dispatch
    },
    $router: {
      push: routerPush
    },
    editAddress
  };

  beforeEach(() => {
    routerPush = jest.fn();
    editAddress = jest.fn();
    actions = {
      Auth: {
        getAddresses: jest.fn(),
        deleteAddress: jest.fn(),
      }
    };
    getters = {
      pricePizza: () => {
        return;
      }
    };
    store = generateMockStore(actions);
    mocks.$store.commit = commit;
    mocks.$store.dispatch = dispatch;
    mocks.$router.push = routerPush;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    authenticateUser(store);
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is address-layout not rendered', () => {
    authenticateUser(store);
    createComponent({ localVue, store, stubs });
    const addressLayout = wrapper.find('[data-test="address-layout"]');
    expect(addressLayout.exists()).toBeFalsy();
  });

  it ('is address-layout rendered', () => {
    authenticateUser(store);
    addressesSet(store);
    createComponent({ localVue, store, stubs });
    const addressLayout = wrapper.find('[data-test="address-layout"]');
    expect(addressLayout.exists()).toBeTruthy();
  });

  it ('is address-empty-layout rendered', () => {
    authenticateUser(store);
    createComponent({ localVue, store, stubs });
    const addressLayout = wrapper.find('[data-test="address-empty"]');
    expect(addressLayout.exists()).toBeTruthy();
  });

  it ('is address view rendered', () => {
    authenticateUser(store);
    addressesSet(store);
    createComponent({ localVue, store, stubs });
    const addressView = wrapper.findAll('[data-test="address-view"]');
    expect(Array.from(addressView).length).toEqual(addresses.length);
  });

  it ('is address view emit event', async () => {
    const spyOnEditAddress = jest.spyOn(Profile.methods, 'editAddress');
    authenticateUser(store);
    addressesSet(store);
    createComponent({ localVue, store, mocks });
    const addressView = wrapper.find('[data-test="address-view"]');
    await addressView.vm.$emit('editAddress', addresses[0]);
    expect(spyOnEditAddress).toHaveBeenCalledWith(
      // expect.any(Object)
      addresses[0]
    );
  });

  it ('is address form is hidden', async () => {
    authenticateUser(store);
    addressesSet(store);
    createComponent({ localVue, store, mocks });
    const addressForm = wrapper.find('[data-test="addressEdit-form"]');
    expect(addressForm.isVisible()).toBeFalsy();
  });

  it ('is address form is visible', async () => {
    authenticateUser(store);
    addressesSet(store);
    createComponent({ localVue, store, mocks });
    await wrapper.setData({ showEditForm: true });
    const addressForm = wrapper.find('[data-test="addressEdit-form"]');
    expect(addressForm.isVisible()).toBeTruthy();
  });

  it ('is address form emit event removeAddress', async () => {
    const spyOnRemoveAddress = jest.spyOn(Profile.methods, 'removeAddress');
    authenticateUser(store);
    addressesSet(store);
    createComponent({ localVue, store, mocks });
    const addressForm = wrapper.find('[data-test="addressEdit-form"]');
    await addressForm.vm.$emit('removeAddress', addresses[0]);
    expect(spyOnRemoveAddress).toHaveBeenCalledWith(
      // expect.any(Object)
      addresses[0]
    );
  });

  it ('is address form emit event removeAddress call action', async () => {
    authenticateUser(store);
    addressesSet(store);
    createComponent({ localVue, store, mocks });
    const spyOnDeleteAddress = jest.spyOn(wrapper.vm, 'deleteAddress');
    const addressForm = wrapper.find('[data-test="addressEdit-form"]');
    await addressForm.vm.$emit('removeAddress', addresses[0]);
    expect(spyOnDeleteAddress).toHaveBeenCalledWith(
      // expect.any(Object)
      addresses[0].id
    );
  });

  it ('is address form emit event closeForm', async () => {
    const spyOnCloseAddress = jest.spyOn(Profile.methods, 'closeForm');
    authenticateUser(store);
    addressesSet(store);
    createComponent({ localVue, store, mocks });
    const addressForm = wrapper.find('[data-test="addressEdit-form"]');
    await addressForm.vm.$emit('closeForm', "edit");
    expect(spyOnCloseAddress).toHaveBeenCalled();
  });

  it('is add button show form', async () => {
    const spyOnshowForm = jest.spyOn(Profile.methods, 'showForm');
    authenticateUser(store);
    addressesSet(store);
    createComponent({ localVue, store, mocks });
    const addBtn = wrapper.find('[data-test="add-btn"]');
    const addressNewForm = wrapper.find('[data-test="addressNew-form"]');
    await addBtn.trigger('click');
    expect(spyOnshowForm).toHaveBeenCalled();
    expect(addressNewForm.isVisible()).toBeTruthy;
    expect(addBtn.attributes('disabled')).toBeTruthy();
  })

  it('is add button attr disabled is false', async () => {
    authenticateUser(store);
    addressesSet(store);
    createComponent({ localVue, store, mocks });
    const addBtn = wrapper.find('[data-test="add-btn"]');
    expect(addBtn.attributes('disabled')).toBeFalsy();
  })

  it ('is address new form is not visible', async () => {
    authenticateUser(store);
    addressesSet(store);
    createComponent({ localVue, store, mocks });
    const addressForm = wrapper.find('[data-test="addressNew-form"]');
    expect(addressForm.isVisible()).toBeFalsy();
  });

  it ('is address new form is visible', async () => {
    authenticateUser(store);
    addressesSet(store);
    createComponent({ localVue, store, mocks });
    await wrapper.setData({ showNewForm: true });
    const addressForm = wrapper.find('[data-test="addressNew-form"]');
    expect(addressForm.isVisible()).toBeTruthy();
  });
})

// Список элементов для тестирования
/*
v-if="addresses && ( addresses.length > 0 )"

@editAddress="editAddress"
v-for="address in this.addresses"

v-show="showEditForm"
@removeAddress="removeAddress"
@closeForm="closeForm"

v-else

@click="showForm"
:disabled="showNewForm"

v-show="showNewForm"
@removeAddress="removeAddress"
@closeForm="closeForm"
*/

// Данные из тест хранилища
/*
...mapGetters('Auth', ['isAuthenticated']),
...mapState('Auth', ['user', 'addresses']),
*/
