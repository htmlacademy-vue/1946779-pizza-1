export const dough_types = [
  {
    label: 'Тонкое',
    rus_label: "тонкое",
    value: 'small',
    checked: true,
  },
  {
    label: 'Толстое',
    rus_label: "толстое",
    value: 'large',
    checked: false,
  }
];

export const pizza_sizes = [
  {
    label: 1,
    value: 'small',
    size: '23см',
    checked: true,
  },
  {
    label: 2,
    value: 'normal',
    size: '32см',
    checked: false,
  },
  {
    label: 3,
    value: 'big',
    size: '45см',
    checked: false,
  }
];

export const pizza_sauces = [
  {
    label: "Томатный",
    rus_label: "томатный",
    value: 'tomato',
    checked: true,
  },
  {
    label: "Сливочный",
    rus_label: "сливочный",
    value: 'creamy',
    checked: false,
  }
];

export const pizza_ingredients = [
  {
    name: "Грибы",
    value: 'mushrooms'
  },
  {
    name: "Чеддер",
    value: 'cheddar'
  },
  {
    name: "Салями",
    value: 'salami'
  },
  {
    name: "Ветчина",
    value: 'ham'
  },
  {
    name: "Ананас",
    value: 'ananas'
  },
  {
    name: "Бекон",
    value: 'bacon'
  },
  {
    name: "Лук",
    value: 'onion'
  },
  {
    name: "Чили",
    value: 'chile'
  },
  {
    name: "Халапеньо",
    value: 'jalapeno'
  },
  {
    name: "Маслины",
    value: 'olives'
  },
  {
    name: "Томаты",
    value: 'tomatoes'
  },
  {
    name: "Лосось",
    value: 'salmon'
  },
  {
    name: "Моцарелла",
    value: 'mozzarella'
  },
  {
    name: "Пармезан",
    value: 'parmesan'
  },
  {
    name: "Блю чиз",
    value: 'blue_cheese'
  }
]

export const misc_types = [
  {
    name: "Cola-Cola 0,5 литра",
    svg: "cola",
    initialCounter: 0,
  },
  {
    name: "Острый соус",
    svg: "sauce",
    initialCounter: 0,
  },
  {
    name: "Картошка из печи",
    svg: "potato",
    initialCounter: 0,
  }
];

export const MOVE = 'move';
export const DATA_TRANSFER_PAYLOAD = 'payload';
