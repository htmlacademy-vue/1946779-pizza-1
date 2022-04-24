import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';

import Vuex from 'vuex';
import Popup from '@/views/Popup.vue';
import AppButton from '@/common/components/AppButton';

import user from '@/static/user';

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


describe('Popup', () => {
  const stubs = [
    'router-view',
    'router-link'
  ];
  let wrapper;
  let store;
  let actions;
  let commit;
  let dispatch;
  let routerPush;

  const createComponent = options => {
    wrapper = mount(Popup, options);
  };

  const mocks = {
    $store: {
      commit,
      dispatch
    },
    $router: {
      push: routerPush
    }
  };

  beforeEach(() => {
    dispatch = jest.fn();
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
    mocks.$store.dispatch = dispatch;
    mocks.$router.push = routerPush;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is close btn is work ', async () => {
    const spyOnClosePopup = jest.spyOn(Popup.methods, 'closePopup');
    createComponent({ localVue, store, mocks });
    const iconBtn = wrapper.find('[data-test="close-btn"]');
    await iconBtn.trigger('click');
    expect(spyOnClosePopup).toHaveBeenCalled();
  });

  it ('is close btn called mutation reset cart state', async () => {
    createComponent({ localVue, store, mocks });
    const spyOnResetCartState = jest.spyOn(wrapper.vm, 'resetCartState')
    const iconBtn = wrapper.find('[data-test="close-btn"]');
    await iconBtn.trigger('click');
    expect(spyOnResetCartState).toHaveBeenCalled();
  });

  it ('is close btn called mutation reset builder state', async () => {
    createComponent({ localVue, store, mocks });
    const spyOnResetBuilderState = jest.spyOn(wrapper.vm, 'resetBuilderState')
    const iconBtn = wrapper.find('[data-test="close-btn"]');
    await iconBtn.trigger('click');
    expect(spyOnResetBuilderState).toHaveBeenCalled();
  });

  it ('is close btn dispatch builder query', async () => {
    createComponent({ localVue, store, mocks });
    const iconBtn = wrapper.find('[data-test="close-btn"]');
    await iconBtn.trigger('click');
    expect(actions.Builder.query).toHaveBeenCalled();
  });

  it ('is redirect login user to orders', async () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks });
    const iconBtn = wrapper.find('[data-test="close-btn"]');
    await iconBtn.trigger('click');
    expect(routerPush).toHaveBeenCalledWith({ name: 'Orders' });
  });

  it ('is redirect login user to home', async () => {
    createComponent({ localVue, store, mocks });
    const iconBtn = wrapper.find('[data-test="close-btn"]');
    await iconBtn.trigger('click');
    expect(routerPush).toHaveBeenCalledWith({ name: 'Home' });
  });
})
