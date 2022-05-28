import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';
import Vuex from 'vuex';
import BuilderItemCounter from '@/modules/builder/BuilderItemCounter';

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();

// Начало блока тестов
describe('BuilderItemCounter', () => {
  let wrapper;
  let counter = '1';

  const propsData = {
    counter: counter
  };

  const createComponent = options => {
    wrapper = mount(BuilderItemCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('component rendered', () => {
    createComponent({ propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it('input value is prop type', () => {
    createComponent({ localVue, propsData });
    let input = wrapper.find('input');
    expect(input.exists()).toBeTruthy();
    expect(input.element.value).toBe(propsData.counter);
  });

  it('button-plus emits counter + 1', async () => {
    createComponent({ propsData });
    let button = wrapper.find('[data-test="button-plus"]');
    await button.trigger('click');
    expect(wrapper.emitted().countIngredient[0][0]).toEqual(propsData.counter + 1);
  });

  it('is button-plus diasabled', async () => {
    let counter = '3';
    let propsData = {
      counter: counter
    };
    createComponent({ localVue, propsData });
    let button = wrapper.find('[data-test="button-plus"]');
    expect(button.element.disabled).toBeTruthy();
  });

  it('button-plus emits counter - 1', async () => {
    createComponent({ propsData });
    let button = wrapper.find('[data-test="button-minus"]');
    await button.trigger('click');
    expect(wrapper.emitted().countIngredient[0][0]).toEqual(propsData.counter - 1);
  });

  it('is button-minus diasabled', async () => {
    let counter = '0';
    let propsData = {
      counter: counter
    };
    createComponent({ localVue, propsData });
    let button = wrapper.find('[data-test="button-minus"]');
    expect(button.element.disabled).toBeTruthy();
  });
})
