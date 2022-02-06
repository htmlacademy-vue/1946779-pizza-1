<template>
  <div>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">

          <h1 class="title title--big">Конструктор пиццы</h1>

          <div class="content__dough">

            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>

              <div class="sheet__content dough">

                <BuilderDoughSelector
                  v-for="dough in doughs"
                  :key="dough.id"
                  :dough=dough
                  @sendDoughData="sendDoughData"
                />

              </div>

            </div>

          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <BuilderSizeSelector
                  v-for="size in sizes"
                  :key="size.id"
                  :size="size"
                  @sendSize="sendSize"
                />

              </div>
            </div>
          </div>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

              <div class="sheet__content ingredients">

                <BuilderIngredientsSelector
                  :sauces="sauces"
                  :ingredients="ingredients"
                  :ingredientDroped="ingredientDroped"
                  @sendSauceData="sendSauceData"
                  @moveIngredient="moveIngredient"
                />

              </div>
            </div>
          </div>

          <div class="content__pizza">

            <BuilderPizzaView
              :doughType="doughType"
              :sauceType="sauceType"
              :ingredientDroped="ingredientDroped"
              @drop="dropIngr($event)"
              @inputNameOfPizza="inputNameOfPizza"
            />

            <BuilderPriceCounter
              :resultPrice="resultPrice"
              :nameOfPizza="nameOfPizza"
              @movePriceToCart="movePriceToCart"
            />

          </div>

        </div>

      </form>
    </main>
  </div>
</template>
<script>

import BuilderDoughSelector from '@/modules/builder/BuilderDoughSelector';
import BuilderSizeSelector from '@/modules/builder/BuilderSizeSelector';
import BuilderIngredientsSelector from '@/modules/builder/BuilderIngredientsSelector';
import BuilderPizzaView from '@/modules/builder/BuilderPizzaView';
import BuilderPriceCounter from '@/modules/builder/BuilderPriceCounter';

import pizza from '@/static/pizza';

import { normalizeDough, normalizeSize, normalizeSauce, normalizeIngredients } from '@/common/helpers';


export default {
  name: "IndexHome",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter
  },
  data() {
    return {
      doughs: pizza.dough.map( (item) => normalizeDough(item)),
      sizes: pizza.sizes.map( (item) => normalizeSize(item)),
      sauces: pizza.sauces.map( (item) => normalizeSauce(item)),
      ingredients: pizza.ingredients.map( (item) => normalizeIngredients(item)),
      saucePrice: 50,
      sauceType: 'tomato',
      doughPrice: 300,
      doughType: 'small',
      sizeMultiplier: 1,
      ingredientMovedArray: [],
      ingredientDroped: [],
      nameOfPizza: '',
      priceToCart: 0,
    };
  },
  methods: {
    sendSauceData(sauceTypeandPrice) {
      this.saucePrice = 0;
      this.saucePrice = sauceTypeandPrice["price"];
      this.sauceType = sauceTypeandPrice["type"];
    },
    sendDoughData(doughTypeandPrice) {
      this.doughPrice = 0;
      this.doughPrice = doughTypeandPrice["price"];
      this.doughType = doughTypeandPrice["type"];
    },
    sendSize(sizeData) {
      this.sizeMultiplier = 0;
      this.sizeMultiplier = sizeData;
    },
    moveIngredient(ingredientInfoObject) {
      if (!this.ingredientMovedArray.find(el => el["id"] === ingredientInfoObject["id"])) {
        this.ingredientMovedArray.push(ingredientInfoObject);
        this.ingredientDroped = this.ingredientMovedArray;

      } else if (this.ingredientMovedArray.find(el => el["id"] === ingredientInfoObject["id"])) {
        const findedElement = this.ingredientMovedArray.find(el => el["id"] === ingredientInfoObject["id"]);
        this.ingredientMovedArray.splice(this.ingredientMovedArray.indexOf(findedElement), 1);
        this.ingredientMovedArray.push(ingredientInfoObject);
        this.ingredientDroped = this.ingredientMovedArray;

      }
    },
    dropIngr(ingredient) {
      if (!this.ingredientMovedArray.includes(this.ingredientMovedArray.find( ing => ing.id === ingredient.id))) {
        this.ingredients.find(( ing => ing.id === ingredient.id)).counter +=1;
        this.ingredientMovedArray.push({
          id: ingredient.id,
          info: this.ingredients.find(( ing => ing.id === ingredient.id))
        })
        this.ingredientDroped = this.ingredientMovedArray;

      } else if (this.ingredientMovedArray.includes(this.ingredientMovedArray.find( ing => ing.id === ingredient.id))) {
        let indexOfingr = this.ingredientMovedArray.indexOf(this.ingredientMovedArray.find( ing => ing.id === ingredient.id));
        if (indexOfingr !== -1) {
          this.ingredients.find(( ing => ing.id === ingredient.id)).counter += 1;
          this.ingredientMovedArray.splice(indexOfingr, 1);
          this.ingredientMovedArray.push({
            id: ingredient.id,
            info: this.ingredients.find(( ing => ing.id === ingredient.id))
          });
          this.ingredientDroped = this.ingredientMovedArray;

        }
      }
    },
    inputNameOfPizza(inputValue) {
      this.nameOfPizza = inputValue;
    },
    movePriceToCart() {
      this.priceToCart = this.resultPrice;

      let infoAboutPizza = {};

      infoAboutPizza.id_pizza = Date.now();
      infoAboutPizza.initialCounter  = 1;
      infoAboutPizza.pizza_name = this.nameOfPizza;
      infoAboutPizza.pizza_sauce = this.sauceType;
      infoAboutPizza.pizza_dough = this.doughType;
      infoAboutPizza.pizza_size = this.sizeMultiplier;
      infoAboutPizza.pizza_price = this.priceToCart;
      infoAboutPizza.pizza_ingredients = this.ingredientDroped;
      this.$emit('sendInfo', infoAboutPizza);
    }
  },
  computed: {
    resultPrice: function () {
      let ingredientMultSum = 0;
      let finalSum = 0

      this.ingredientDroped.forEach( el => {
        let ingredientMult = el.info.counter * el.info.price;
        ingredientMultSum = ingredientMultSum + ingredientMult;
      });

      if( ingredientMultSum > 0) {
        finalSum = ( parseInt(this.saucePrice) + parseInt(this.doughPrice) + parseInt(ingredientMultSum) ) * this.sizeMultiplier;

      } else {
        finalSum = 0;
        return;
      }

      return finalSum;
    }
  },

}
</script>
