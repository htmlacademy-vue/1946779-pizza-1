import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';
import Vuex from 'vuex';
import BuilderDoughSelector from '@/modules/builder/BuilderDoughSelector';

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();

// Добавляем в него Vuex.
localVue.use(Vuex);

// Начало блока тестов
describe('BuilderDoughSelector', () => {
  let wrapper;
  let store;
  let commit;
  let dispatch;

  const propsData = {
    dough: {
      checked:true,
      description:"Из твердых сортов пшеницы",
      id:1,
      image:"/public/img/dough-light.svg",
      name:"Тонкое",
      price:300,
      type:"small",
    }
  };

  const mocks = {
    $store: {
      commit,
      dispatch,
    },
  };

  const createComponent = options => {
    wrapper = mount(BuilderDoughSelector, options);
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
    const doughLabel = wrapper.find('[data-test="dough__label"]');
    expect(doughLabel.exists()).toBeTruthy();
    expect(doughLabel.attributes('class')).toContain('dough__input--small');
  });

  it('input value attr is dough.type', () => {
    createComponent({ store, propsData });
    const doughInput = wrapper.find('[data-test="dough__input"]');
    expect(doughInput.exists()).toBeTruthy();
    expect(doughInput.attributes('value')).toBe(propsData.dough.type);
  });

  it('input check attr is checked', () => {
    createComponent({ store, propsData });
    const input = wrapper.find('input[type="radio"]');
    expect(input.exists()).toBeTruthy();
    expect(input.element.checked).toBe(propsData.dough.checked);
  });

  it('input input is checked', () => {
    createComponent({ store, propsData });
    const input = wrapper.find('input[type="radio"]');
    expect(input.exists()).toBeTruthy();
    input.trigger('input');
    expect(input.element.checked).toBeTruthy();
  });

  it('calls the vuex mutation on input', () => {
    const spyOnSendDoughData = jest.spyOn(BuilderDoughSelector.methods, 'sendDoughData');
    createComponent({ store, propsData });
    const input = wrapper.find('input[type="radio"]');
    expect(input.exists()).toBeTruthy();
    input.trigger('input');
    expect(spyOnSendDoughData).toHaveBeenCalled();
  });
});

// Список элементов для тестирования
/*
:class="`dough__input--${dough.type}`"
:value="dough.type"
@input="sendDoughData"
:checked="dough.checked"
...mapMutations("Builder", { addDough: "ADD_DOUGH" }),
*/

// Данные из тест хранилища
/*

 */
