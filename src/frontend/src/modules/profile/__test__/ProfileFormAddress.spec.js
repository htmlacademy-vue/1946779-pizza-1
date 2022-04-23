import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';

import Vuex from 'vuex';
import ProfileFormAddress from '@/modules/profile/ProfileFormAddress.vue';
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

describe('ProfileFormAddress', () => {
  let propsData = {
    user: user,
    address: addresses[0],
    buttonText: 'Удалить',
    mode: 'new'
  };
  let store;
  let commit;
  let dispatch;
  let wrapper;
  let actions;

  const createComponent = options => {
    wrapper = mount(ProfileFormAddress, options);
  };

  const mocks = {
    $store: {
      commit,
      dispatch
    },
  };

  beforeEach(() => {
    actions = {
      Auth: {
        postAddress: jest.fn(),
        putAddress: jest.fn(),
        getAddresses: jest.fn()
      }
    };
    dispatch = jest.fn();
    store = generateMockStore(actions);
    mocks.$store.commit = commit;
    mocks.$store.dispatch = dispatch;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is event has been called on form submit, newMode', async () => {
    const spyOnSaveAddress = jest.spyOn(ProfileFormAddress.methods, 'saveAddress');
    createComponent({ localVue, store, propsData, mocks });
    await wrapper.find('form').trigger('submit');
    expect(spyOnSaveAddress).toHaveBeenCalled();
    expect(actions.Auth.postAddress).toHaveBeenCalled();
    expect(wrapper.emitted().closeForm[0][0]).toEqual(propsData.mode);
  });

  it ('is event has been called on form submit, editMode', async () => {
    let propsData = {
      user: user,
      address: addresses[0],
      buttonText: 'Удалить',
      mode: 'edit'
    };
    const spyOnSaveAddress = jest.spyOn(ProfileFormAddress.methods, 'saveAddress');
    createComponent({ localVue, store, propsData, mocks });
    await wrapper.find('form').trigger('submit');
    expect(spyOnSaveAddress).toHaveBeenCalled();
    expect(wrapper.emitted().closeForm[0][0]).toEqual(propsData.mode);
  });

  it ('is event has been called on form submit', async () => {
    createComponent({ localVue, store, propsData, mocks });
    const btn = wrapper.find('[data-test="remove-btn"]');
    await btn.trigger('click');
    expect(wrapper.emitted().removeAddress[0][0]).toEqual(propsData.address);
  });

  it ('is event has been called on form submit, editMode', async () => {
    let propsData = {
      user: user,
      address: addresses[0],
      buttonText: 'Удалить',
      mode: 'edit'
    };
    const spyOnSaveAddress = jest.spyOn(ProfileFormAddress.methods, 'saveAddress');
    createComponent({ localVue, store, propsData, mocks });
    await wrapper.find('form').trigger('submit');
    expect(spyOnSaveAddress).toHaveBeenCalled();
    expect(wrapper.emitted().closeForm[0][0]).toEqual(propsData.mode);
  });
})

// Список элементов для тестирования
/*
@click="$emit('editAddress', address)"
*/
