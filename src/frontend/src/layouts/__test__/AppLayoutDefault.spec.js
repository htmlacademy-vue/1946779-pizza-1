import { shallowMount } from '@vue/test-utils';
import AppLayoutDefault from '@/layouts/AppLayoutDefault.vue';

describe('AppLayoutDefault', () => {
  let wrapper;
  let slots = {
    default: 'content'
  }

  const createComponent = options => {
    wrapper = shallowMount(AppLayoutDefault, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({  });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is rendered', () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });
})
