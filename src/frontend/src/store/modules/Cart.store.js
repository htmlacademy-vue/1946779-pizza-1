import misc from '@/static/misc';
import { normalizeMisc } from '@/common/helpers';

export default {
  namespaced: true,
  state: {
    pizzas: [],
    miscs: [],
    orderInfo: {}
  },
  getters: {
    finalPrice(state) {
      let allPizzasPrice = 0;

      state.pizzas.forEach( element => {
        allPizzasPrice += element.price * element.count;
      });

      let allMiscsPrice = 0;
      state.miscs.forEach( el => {
        allMiscsPrice += el.price * el.initialCounter;
      });

      return (allPizzasPrice + allMiscsPrice);
    }
  },
  mutations: {
    SET_PIZZA: (state, pizza) => state.pizzas.push(pizza),
    SET_MISCS: (state, miscs) => (state.miscs = miscs),

    ADD_PIZZA_COUNT: (state, pizza) => {
      state.pizzas.find( (el) => el.id === pizza.id ).count = pizza.count;
    },
    ADD_ADDITIONALS: (state, adds) => {
      state.miscs.find(el => (el.id === adds.id)).initialCounter = adds.count;
    },
    ADD_ORDERINFO: (state, orderInfo) => (state.orderInfo = orderInfo),
  },
  actions: {
    setAdditionals({ commit }) {
      const miscs = misc.map(item => normalizeMisc(item));
      commit('SET_MISCS', miscs);
    },

    addPizzaCount({ state, commit}, pizzaInfo) {
      const pizza = {};
      Object.assign(pizza, state.pizzas.find(el => el.id === pizzaInfo.id));
      pizza.count = pizzaInfo.count;
      commit('ADD_PIZZA_COUNT', pizza);
    },

    addAdditional({state, commit}, additionalInfo) {
      commit('ADD_ADDITIONALS', additionalInfo)
    }
  },
}
