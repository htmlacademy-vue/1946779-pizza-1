import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';

import Vuex from 'vuex';
import ProfileAddressView from '@/modules/profile/ProfileAddressView.vue';

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

describe('ProfileAddressView', () => {
  let propsData = {
    address: addresses[0]
  }
  let store;
  let wrapper;

  const createComponent = options => {
    wrapper = mount(ProfileAddressView, options);
  };

  const mocks = {
    $store: {
    },
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is emitted event editAddress', async () => {
    authenticateUser(store);
    addressesSet(store);
    createComponent({ localVue, propsData });
    const btn = wrapper.find('[data-test="edit-btn"]');
    await btn.trigger('click');
    expect(wrapper.emitted().editAddress[0][0]).toEqual(propsData.address);
  });
})

// Список элементов для тестирования
/*
@click="$emit('editAddress', address)"
*/
