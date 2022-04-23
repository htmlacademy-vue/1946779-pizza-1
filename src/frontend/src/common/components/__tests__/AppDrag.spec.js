import { mount } from '@vue/test-utils';
import AppDrag from '@/common/components/AppDrag.vue';

describe('AppDrag', () => {
  let wrapper;

  let propsData = {
    transferData: {id:4,name:"Лосось",image:"/public/img/filling/salmon.svg",price:50,type:"salmon",counter:0},
    isDraggable: true
  }

  function dataTransfer() {
    return {
      dataTransfer: {
        setData: function() {}
      }
    }
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
    createComponent({ propsData });
    await wrapper.find('[data-test="drag-div"]').trigger('dragstart', dataTransfer());
  });
});
