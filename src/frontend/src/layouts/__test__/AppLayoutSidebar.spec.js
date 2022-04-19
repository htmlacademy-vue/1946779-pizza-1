import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';

import Vuex from 'vuex';
import AppLayoutSidebar from '@/layouts/AppLayoutSidebar.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AppLayoutSidebar', () => {
  const mocks = {
    $route: {
      name: 'test'
    }
  };

  const stubs = ['router-link'];

  let wrapper;
  let store;

  let propsData = {
    isActiveClass: true
  };

  const createComponent = options => {
    wrapper = mount(AppLayoutSidebar, options);
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

})
