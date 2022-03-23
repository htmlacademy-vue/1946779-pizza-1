import { cloneDeep } from 'lodash';

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  mutations: {
    ADD_ORDER: (state, data) => (state.order = data),
    ADD_ORDERS: (state, data) => (state.orders = data),

    DELETE_ORDER: (state, orderId) => {
      state.orders.splice(state.orders.indexOf(state.orders.find(el => el.id === orderId)), 1);
    }
  },
  actions: {
    async query({ commit }, config) {
      const data = await this.$api.orders.query(config);
      commit('ADD_ORDERS', data)
    },

    async post({ commit }, order) {
      const orderCopy = cloneDeep(order);
      const data = await this.$api.orders.post(orderCopy);
      return data;
    },

    async deleteOrder({ commit }, orderId) {
      const data = await this.$api.orders.delete(orderId);
      commit('DELETE_ORDER', orderId);
    },

    async repeatOrder({ rootState, commit }, order) {
      const doughsFromState = rootState.Builder.doughs;
      const ingredientsFromState = rootState.Builder.ingredients;
      const saucesFromState = rootState.Builder.doughs;
      const sizesFromState = rootState.Builder.sizes;

      await order.orderPizzas.forEach( orderPizza => {
        let count = orderPizza.quantity,
            dough = doughsFromState.find( el => el.id === orderPizza.doughId ),
            ingredients = ingredientsFromState.filter( ingredient => {
              if (orderPizza.ingredients.find( ing =>  ing.ingredientId === ingredient.id )) {
                ingredient.counter = orderPizza.ingredients.find( ing =>  ing.ingredientId === ingredient.id ).quantity;
                return ingredient;
              }
            }),
            sauce = saucesFromState.find( el => el.id === orderPizza.sauceId ),
            size = sizesFromState.find( el => el.id === orderPizza.sizeId ),
            price = function() {
              let ingredientsPriceSum = 0;

              ingredients.forEach( ingredient => {
                ingredientsPriceSum += parseInt(ingredient.counter * ingredient.price);
              });

              return ((sauce.price + dough.price + ingredientsPriceSum) * size.multiplier);
            };

        let pizza = {
          "id": orderPizza.id,
          "count": count,
          "dough": dough,
          "ingredients": ingredients,
          "pizzaName": orderPizza.name,
          "sauce": sauce,
          "size": size,
          "price": price()
        };
        console.log(pizza);
        commit('Cart/SET_PIZZA', pizza, { root: true });
      });


      const miscs = rootState.Cart.miscs;
      const findedMiscs = [];

      await  order.orderMisc.forEach( misc => {
        let findedMisc = miscs.find( el => el.id === misc.miscId);
        findedMisc.initialCounter = misc.quantity;

        findedMiscs.push(findedMisc)
      })
      await commit('Cart/SET_MISCS', findedMiscs, { root: true });
    }
  }
}
