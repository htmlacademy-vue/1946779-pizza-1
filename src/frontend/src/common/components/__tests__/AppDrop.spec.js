import { mount } from '@vue/test-utils';
import AppDrop from '@/common/components/AppDrop.vue';

describe('AppDrop', () => {
  let wrapper;

  function dataTransfer() {
    return {
      dataTransfer: {
        getData: function() {
          return JSON.stringify({id:4,name:"Лосось",image:"/public/img/filling/salmon.svg",price:50,type:"salmon",counter:0});
        }
      }
    }
  }

  const createComponent = options => {
    wrapper = mount(AppDrop, options);
  };

  beforeEach(() => {

  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent();
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('is drop called onDrop', async () => {
    createComponent();
    await wrapper.find('[data-test="drop-div"]').trigger('drop', dataTransfer());
    expect(wrapper.emitted().drop[0][0]).toEqual({"id":4,"name":"Лосось","image":"/public/img/filling/salmon.svg","price":50,"type":"salmon","counter":0});
  });
});
