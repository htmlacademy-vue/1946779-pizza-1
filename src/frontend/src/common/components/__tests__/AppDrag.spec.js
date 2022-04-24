import { mount } from '@vue/test-utils';
import AppDrag from '@/common/components/AppDrag.vue';

describe('AppDrag', () => {
  let wrapper;
  let setData;

  let propsData = {
    transferData: {id:4,name:"Лосось",image:"/public/img/filling/salmon.svg",price:50,type:"salmon",counter:0},
    isDraggable: true
  }

  const dataTransfer = {
    setData: jest.fn(),
    effectAllowed: '',
    dropEffect: ''
  }

  const mocks = {
    setData
  }

  const createComponent = options => {
    wrapper = mount(AppDrag, options);
  };

  beforeEach(() => {

  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is drag called onDrag', async () => {
    createComponent({ propsData, mocks });
    await wrapper.find('[data-test="drag-div"]').trigger('dragstart', { dataTransfer });
    expect(dataTransfer.setData).toHaveBeenCalled();
  });
});
