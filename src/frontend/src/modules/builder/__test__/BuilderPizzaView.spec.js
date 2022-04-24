import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '@/store/mocks';
import Vuex from 'vuex';
import BuilderPizzaView from '@/modules/builder/BuilderPizzaView';
import AppDrop from '@/common/components/AppDrop';


// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();

// Добавляем в него Vuex.
localVue.use(Vuex);
localVue.component('AppDrop', AppDrop);

const buildedPizza = {
  count:1,
  dough: {
    id:1,
    price:300,
    type:"small",
  },
  id:"1",
  ingredients: [
    {
      counter:2,
      id:4,
      image:"/public/img/filling/salmon.svg",
      name:"Лосось",
      price:50,
      type:"salmon",
    },
  ],
  pizzaName:"new",
  price:0,
  sauce: {
    id:2,
    price:50,
    type:"creamy",
  },
  size: {
    checked:true,
    id:1,
    image:"/public/img/diameter.svg",
    multiplier:1,
    name:"23 см",
    type:"small",
  }
};

const setPizzaToBuildedPizza = store => {
  store.commit("Builder/SET_PIZZA_TO_CHANGE", buildedPizza);
};

const originalNameOfPizza = 'testName';

// Начало блока тестов
describe('BuilderPizzaView', () => {
  let wrapper;
  let store;
  let commit;

  const propsData = {

  };

  const mocks = {
    $store: {
      commit,
    }
  };

  const createComponent = options => {
    wrapper = mount(BuilderPizzaView, options);
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

  it('is drop listener emmited event', async () => {
    setPizzaToBuildedPizza(store);
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
    const dropDiv = wrapper.find('[data-test="drop-emit"]');
    await dropDiv.vm.$emit('drop', '');
    expect(wrapper.emitted().drop).toBeTruthy();
  });

  it('is class of doughAndSouce image class is from state', () => {
    setPizzaToBuildedPizza(store);
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
    const doughType = wrapper.find('[data-teet="doughAndSouce-image"]');
    // console.log(doughType.attributes('class'));
    expect(doughType.attributes('class')).toBe(`pizza pizza--foundation--${buildedPizza.dough.type}-${buildedPizza.sauce.type}`)
  });

  it('is computed dropIngredientParsed is from state', () => {
    const dropIngredientParsed = (buildedPizza) => {
      let newArrIngredients = [];
      buildedPizza.ingredients.forEach( element => {
        for (let index = 1; index <= parseInt(element.counter); index++) {
          const cloneElement = Object.assign({}, element);
          cloneElement.number = index;
          cloneElement.keyId = cloneElement.id * cloneElement.number + cloneElement.type;
          newArrIngredients.unshift(cloneElement);
        }
      });
      return newArrIngredients;
    }

    setPizzaToBuildedPizza(store);
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
    const ingredientType = wrapper.findAll('[data-test="ingredientType"]');
    const ingredients = dropIngredientParsed(buildedPizza);
    expect(Array.from(ingredientType).length).toEqual(ingredients.length);
  });

  it('is class is from dropIngredientParsed', () => {
    const dropIngredientParsed = (buildedPizza) => {
      let newArrIngredients = [];
      buildedPizza.ingredients.forEach( element => {
        for (let index = 1; index <= parseInt(element.counter); index++) {
          const cloneElement = Object.assign({}, element);
          cloneElement.number = index;
          cloneElement.keyId = cloneElement.id * cloneElement.number + cloneElement.type;
          newArrIngredients.unshift(cloneElement);
        }
      });
      return newArrIngredients;
    }

    setPizzaToBuildedPizza(store);
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
    const ingredientType = wrapper.find('[data-test="ingredientType"]');
    const ingredients = dropIngredientParsed(buildedPizza);
    expect(ingredientType.attributes('class')).toContain(ingredients[0].type);
  });

  it('is second class is from dropIngredientParsed', () => {
    const dropIngredientParsed = (buildedPizza) => {
      let newArrIngredients = [];
      buildedPizza.ingredients.forEach( element => {
        for (let index = 1; index <= parseInt(element.counter); index++) {
          const cloneElement = Object.assign({}, element);
          cloneElement.number = index;
          cloneElement.keyId = cloneElement.id * cloneElement.number + cloneElement.type;
          newArrIngredients.unshift(cloneElement);
        }
      });
      return newArrIngredients;
    }

    setPizzaToBuildedPizza(store);
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
    const ingredientType = wrapper.find('[data-test="ingredientType"]');
    const ingredients = dropIngredientParsed(buildedPizza);
    expect(ingredientType.attributes('class')).toContain('pizza__filling--second');
  });

  it('is data-id is from dropIngredientParsed', () => {
    const dropIngredientParsed = (buildedPizza) => {
      let newArrIngredients = [];
      buildedPizza.ingredients.forEach( element => {
        for (let index = 1; index <= parseInt(element.counter); index++) {
          const cloneElement = Object.assign({}, element);
          cloneElement.number = index;
          cloneElement.keyId = cloneElement.id * cloneElement.number + cloneElement.type;
          newArrIngredients.unshift(cloneElement);
        }
      });
      return newArrIngredients;
    }

    setPizzaToBuildedPizza(store);
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
    const ingredientType = wrapper.find('[data-test="ingredientType"]');
    const ingredients = dropIngredientParsed(buildedPizza);
    expect(ingredientType.attributes('[data-id]')).toEqual(ingredients[0].index);
  });

  it('is watcher originalNameOfPizza working', async () => {
    setPizzaToBuildedPizza(store);
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
    const spyOnMutation = jest.spyOn(wrapper.vm, 'setPizzaName');
    const input = wrapper.find('input[type="text"]');
    await input.setValue('----testing----');
    expect(spyOnMutation).toHaveBeenCalledWith('----testing----');
  });
})

// Список элементов для тестирования
/*
:class="`pizza--foundation--${doughType}-${sauceType}`"
  v-for="(ingredientType, index) in dropIngredientParsed"
  :key="ingredientType.keyId"
  :data-id="index"
  class="pizza__filling"
  :class="[`pizza__filling--${ingredientType.type}`,
    {'pizza__filling--second': ingredientType.number === 2},
    {'pizza__filling--third': ingredientType.number === 3} ]"
@drop="$emit('drop', $event)"
    ...mapMutations("Builder", {
      setPizzaName: "ADD_PIZZA_NAME"
    }),
    ...mapState("Builder", ['buildedPizza']),
*/

// Данные из тест хранилища
/*

 */
