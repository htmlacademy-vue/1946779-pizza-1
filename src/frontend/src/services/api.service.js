import JwtService from '@/services/jwt.service';
import axios from '@/plugins/axios';

import { dough_types, pizza_sizes, pizza_sauces, pizza_ingredients, misc_types  } from '@/common/constants';

class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
}

// Read-only API-сервис:
export class ReadOnlyApiService extends BaseApiService {
  // resource — приватное свойство класса. Добавляем его к базовому URL, чтобы получить
  // финальный URL, на который нужно отправлять запросы
  #resource;
  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  // запрос на получение списка сущностей
  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  // запрос на получение одной сущности по id
  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

// Наследуемся от Read-only API-сервиса и добавляем операции post, put, delete:
export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource, notifier) {
    super(resource, notifier);
    this.#resource = resource;
  }

  // запрос на создание сущности
  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  // запрос на обновление сущности
  async put(entity) {
    const { data } = await axios.put(
      `${this.#resource}/${entity.id}`,
      entity
    );
    return data;
  }

  // запрос на удаление сущности
  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}

// наследуемся от BaseApiService, так как класс не подразумевает CRUD операции
export class AuthApiService extends BaseApiService {

  constructor(notifier) {
    // передаём notifier для использования в родительском конструкторе
    super(notifier);
  }

  // задаём токен авторизации
  setAuthHeader() {
    // получаем токен из LocalStorage с помощью JWT-сервиса
    const token = JwtService.getToken();
    // добавляем заголовок авторизации в axios как Bearer token
    axios.defaults.headers.common['Authorization'] = token
      ? `Bearer ${token}`
      : '';
  }

  async login(params) {
    // отправляем логин/пароль для авторизации на сервере
    const { data } = await axios.post('login', params);
    return data;
  }

  async logout() {
    // делаем логаут на сервере
    const { data } = await axios.delete('logout');
    return data;
  }

  async getMe() {
    // получаем профиль залогиненного пользователя
    const { data } = await axios.get('whoAmI');
    return data;
  }
}

// Наследуемся от CRUD API-сервиса
// ingredients:
export class IngredientApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super('ingredients', notifier);
  }

  // Нормализация ингредиентов, полученной с сервера:
  _normalize(ings) {
    return {
      ...ings,
      type: pizza_ingredients.find(({ name }) => ings.name === name)?.value,
      counter: 0,
    }
  }

  // Получение ингредиентов:
  async query( config = {} ) {
    const ingredients = await super.query(config);
    return ingredients.map( ingredient => this._normalize(ingredient));
  }

}

// sauces:
export class SauceApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super('sauces', notifier);
  }

  // Нормализация видов соуса, полученной с сервера:
  _normalize(sauces) {
    return {
      ...sauces,
      type: pizza_sauces.find(({ label }) => sauces.name === label)?.value,
      checked: pizza_sauces.find(({ label }) => sauces.name === label)?.checked,
    };
  }

  // Получение  видов соуса:
  async query( config = {} ) {
    const sauces = await super.query(config);
    return sauces.map( sauce => this._normalize(sauce));
  }
}

// doughs:
export class DoughApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super('dough', notifier);
  }

  // Нормализация видов теста, полученной с сервера:
  _normalize(dough) {
    return {
      ...dough,
      type: dough_types.find(({ label }) => dough.name === label)?.value,
      checked: dough_types.find(({ label }) => dough.name === label)?.checked,
    };
  }

  // Получение видов теста:
  async query( config = {} ) {
    const doughs = await super.query(config);
    return doughs.map( dough => this._normalize(dough));
  }
}

// sizes:
export class SizeApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super('sizes', notifier);
  }

  // Нормализация видов теста, полученной с сервера:
  _normalize(sizes) {
    return {
      ...sizes,
      type: pizza_sizes.find(({ label }) => sizes.multiplier === label)?.value,
      checked: pizza_sizes.find(({ label }) => sizes.multiplier === label)?.checked,
    };
  }

  // Получение доп товаров:
  async query( config = {} ) {
    const sizes = await super.query(config);
    return sizes.map( size => this._normalize(size));
  }
}

// miscs:
export class MiscApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super('misc', notifier);
  }

  // Нормализация доп товаров, полученной с сервера:
  _normalize(misc) {
    return {
      ...misc,
      initialCounter: misc_types.find(({ name }) => misc.name === name)?.initialCounter,
      svgName: misc_types.find(({ name }) => misc.name === name)?.svg,
    };
  }

  // Получение доп товаров:
  async query() {
    const miscs = await super.query();
    return miscs.map( size => this._normalize(size));
  }
}

//  orders:
export class OrdersApiService extends CrudApiService {
  constructor(notifier) {
    super('orders', notifier);
  }

  // Получение списка заказов
  async query(config = {}) {
    const orders = await super.query(config);
    return orders;
  }

  // Создание нового заказa
  async post(order) {
    const { data: newOrder } =
      await axios.post('orders', order);
    return { data: newOrder };
  }
}


//  orders:
export class AddressApiService extends CrudApiService {
  constructor(notifier) {
    super('addresses', notifier);
  }

  // Получение списка адресов
  async query(config = {}) {
    const addresses = await super.query(config);
    return addresses;
  }

  // Редактирование адреса
  async put(address) {
    await axios.put(`addresses/${address.id}`, address);
    return address;
  }

  // Создание нового адреса
  async post(address) {
    const {data: newAddress} =
      await axios.post('addresses', address);
    return newAddress;
  }

  // запрос на удаление адреса
  async delete(id) {
    const { data } = await axios.delete(`addresses/${id}`);
    return data;
  }
}
