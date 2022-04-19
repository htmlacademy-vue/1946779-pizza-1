import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';

import user from '@/static/user';

import AppLayout from '@/layouts/AppLayout.vue';


describe('AppLayout', () => {
  let wrapper;

  let propsData = {
    price: 100,
    isLogin: true,
    user: user,
    firstLoad: false,
  };

  const mocks = {
    $route: {
      meta: {
        layout: ''
      }
    }
  };

  const createComponent = options => {
    wrapper = mount(AppLayout, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ propsData, mocks });
    expect(wrapper.exists()).toBeTruthy();
  });
})
