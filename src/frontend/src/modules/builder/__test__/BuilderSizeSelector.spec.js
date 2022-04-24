import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';
import Vuex from 'vuex';
import BuilderSizeSelector from '@/modules/builder/BuilderSizeSelector';

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();

// Добавляем в него Vuex.
localVue.use(Vuex);

// Начало блока тестов
describe('BuilderSizeSelector', () => {
  let wrapper;
  let store;
  let commit;
  let dispatch;

  const propsData = {
    size: {
      checked:true,
      id:3,
      image:"/public/img/diameter.svg",
      multiplier:3,
      name:"45 см",
      type:"big",
    }
  };

  const mocks = {
    $store: {
      commit,
      dispatch,
    },
  };

  const createComponent = options => {
    wrapper = mount(BuilderSizeSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('component rendered', () => {
    createComponent({ store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it('shows type attr class', () => {
    createComponent({ store, propsData });
    const sizeLabel = wrapper.find('[data-test="size__label"]');
    expect(sizeLabel.exists()).toBeTruthy();
    expect(sizeLabel.attributes('class')).toContain('diameter__input--big');
  });

  it('input value attr is dough.type', () => {
    createComponent({ store, propsData });
    const sizeInput = wrapper.find('[data-test="size__input"]');
    expect(sizeInput.exists()).toBeTruthy();
    expect(sizeInput.attributes('value')).toBe(propsData.size.name.split(' ', )[0]);
  });

  it('input check attr is checked', () => {
    createComponent({ store, propsData });
    const input = wrapper.find('input[type="radio"]');
    expect(input.exists()).toBeTruthy();
    expect(input.element.checked).toBe(propsData.size.checked);
  });

  it('input input is checked', () => {
    createComponent({ store, propsData });
    const input = wrapper.find('input[type="radio"]');
    expect(input.exists()).toBeTruthy();
    input.trigger('input');
    expect(input.element.checked).toBeTruthy();
  });

  it('calls the vuex mutation on input', () => {
    createComponent({ store, propsData });
    const input = wrapper.find('input[type="radio"]');
    expect(input.exists()).toBeTruthy();
    const spyOnMutation = jest.spyOn(wrapper.vm, 'addSize');
    input.trigger('input');
    expect(spyOnMutation).toHaveBeenCalledWith(propsData.size);
  });
})


// Список элементов для тестирования
/*
  :class="`diameter__input--${size.type}`"
  :style="{'--varSize': `url(${size.image})`}"
  :value="size.name.split(' ', )[0]"
  :checked="size.checked"
  @input="sendSize"
*/

// Данные из тест хранилища
/*
  ...mapMutations("Builder", {addSize: 'ADD_SIZE'}),
 */
