import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';
import user from '@/static/user';

import Vuex from 'vuex';
import AppLayoutProfile from '@/layouts/AppLayoutProfile.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AppLayoutProfile', () => {
  const mocks = {
    $route: {
      name: 'test'
    }
  };

  const stubs = ['router-link'];

  let wrapper;
  let store;

  let propsData = {
    user: user,
    isLogin: true,
    price: 111
  };

  const createComponent = options => {
    wrapper = mount(AppLayoutProfile, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ localVue, propsData, store, mocks, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is renders header', () => {
    createComponent({ localVue, propsData, store, mocks, stubs });
    const header = wrapper.find('[data-test="header"]');
    expect(header.exists()).toBeTruthy();
  });

  it ('is renders sidebar', () => {
    createComponent({ localVue, propsData, store, mocks, stubs });
    const sidebar = wrapper.find('[data-test="sidebar"]');
    expect(sidebar.exists()).toBeTruthy();
  });
})
