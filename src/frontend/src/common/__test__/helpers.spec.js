import {
  parsePizzaInfo,
  parsePizzaCost,
  createPizzasRequestObj,
  createMiscRequestObj,
  normalizeDough,
  normalizeSize,
  normalizeSauce,
  normalizeIngredients,
  normalizeMisc
} from '@/common/helpers';

import pizza from '@/static/pizza';
import misc from '@/static/misc';
import { dough_types, pizza_sizes, pizza_sauces, pizza_ingredients, misc_types  } from '@/common/constants';

describe('test helpers functions', () => {

  it('test parsePizzaInfo', () => {
    let pizzas = [
      {
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
        pizzaName: "new",
        price: 400,
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
      }
    ];
    expect(parsePizzaInfo(pizzas[0].ingredients)).toEqual(["Лосось"]);
  });

  it('test parsePizzaCost', () => {
    let pizzas =  [
      {
        "id": "1",
        "count": 1,
        "dough": {
          "type": "large",
          "price": 300,
          "id": 2
        },
        "ingredients": [
          {
            "id": 10,
            "name": "Ананас",
            "image": "/public/img/filling/ananas.svg",
            "price": 25,
            "type": "ananas",
            "counter": 1
          },
          {
            "id": 7,
            "name": "Блю чиз",
            "image": "/public/img/filling/blue_cheese.svg",
            "price": 50,
            "type": "blue_cheese",
            "counter": 1
          }
        ],
        "pizzaName": "123",
        "price": 850,
        "sauce": {
          "type": "creamy",
          "price": 50,
          "id": 2
        },
        "size": {
          "id": 2,
          "name": "32 см",
          "image": "/public/img/diameter.svg",
          "multiplier": 2,
          "type": "normal",
          "checked": false
        }
      },
      {
        "id": "3",
        "count": 1,
        "dough": {
          "type": "large",
          "price": 300,
          "id": 2
        },
        "ingredients": [
          {
            "id": 2,
            "name": "Чеддер",
            "image": "/public/img/filling/cheddar.svg",
            "price": 42,
            "type": "cheddar",
            "counter": 1
          },
          {
            "id": 4,
            "name": "Лосось",
            "image": "/public/img/filling/salmon.svg",
            "price": 50,
            "type": "salmon",
            "counter": 1
          }
        ],
        "pizzaName": "';l';l",
        "price": 442,
        "sauce": {
          "type": "creamy",
          "price": 50,
          "id": 2
        },
        "size": {
          "id": 1,
          "name": "23 см",
          "image": "/public/img/diameter.svg",
          "multiplier": 1,
          "type": "small",
          "checked": true
        }
      }
    ];
    expect(parsePizzaCost(pizzas)).toEqual(1292);
  });

  it('test createPizzasRequestObj', () => {
    let pizzas = [
      {
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
        pizzaName: "new",
        price: 400,
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
      }
    ];
    let pizzasParsed = [
      {
        "name":  "new",
        "sauceId": 2,
        "doughId": 1,
        "sizeId": 1,
        "quantity": 1,
        "ingredients": [
          {
            ingredientId: 4,
            quantity: 2
          },
        ],
      }
    ];
    expect(createPizzasRequestObj(pizzas)).toEqual(pizzasParsed);
  });

  it('test createMiscRequestObj', () => {
    const miscs = misc.map( (item) => normalizeMisc(item));
    let miscParsed = [
      {
        "miscId": 1,
        "quantity": 0
      },
      {
        "miscId": 2,
        "quantity": 0
      },
      {
        "miscId": 3,
        "quantity": 0
      },
    ]
    expect(createMiscRequestObj(miscs)).toEqual(miscParsed);
  });

  it('test normalizeDough', () => {
    expect(normalizeDough(pizza.dough[0])).toEqual(
      {
        "id": 1,
        "name": "Тонкое",
        "image": "/public/img/dough-light.svg",
        "description": "Из твердых сортов пшеницы",
        "price": 300,
        "type": 'small',
        "checked": true
      },
    );
  });

  it('test normalizeSize', () => {
    expect(normalizeSize(pizza.sizes[0])).toEqual(
      {
        "id": 1,
        "name": "23 см",
        "image": "/public/img/diameter.svg",
        "multiplier": 1,
        "type": 'small',
        "checked": true
      }
    );
  });

  it('test normalizeSauce', () => {
    expect(normalizeSauce(pizza.sauces[0])).toEqual(
      {
        "id": 1,
        "name": "Томатный",
        "price": 50,
        "type": 'tomato',
        "checked": true
      }
    );
  });

  it('test normalizeIngredients', () => {
    expect(normalizeIngredients(pizza.ingredients[0])).toEqual(
      { "id": 1, "name": "Грибы", "image": "/public/img/filling/mushrooms.svg", "price": 33, type: 'mushrooms', counter: 0 }
    );
  });

  it('test normalizeMisc', () => {
    expect(normalizeMisc(misc[0])).toEqual(
      {
        "id": 1,
        "name": "Cola-Cola 0,5 литра",
        "image": "/public/img/cola.svg",
        "price": 56,
        "initialCounter": 0,
        "svgName": "cola"
      },
    );
  });
})
