/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = '';

  static cloneAndMerge(sourceData, addData) {
    let data = {};
    for (let key in sourceData) {
      data[key] = sourceData[key];
    }
    for(let key in addData) {
      data[key] = addData[key];
    }
    return data;
  }

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    return createRequest({
      url: Entity.URL,
      method: 'GET',
      data: data,
      responseType: 'json',
      callback: callback
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    return createRequest({
      url: Entity.URL,
      method: 'POST',
      data: Object.assign({_method: 'PUT'}, data),
      responseType: 'json',
      callback: callback
    });
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    return createRequest({
      url: Entity.URL,
      method: 'GET',
      data: data,
      responseType: 'json',
      callback: callback
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    return createRequest({
      url: Entity.URL,
      method: 'POST',
      data: Object.assign({_method: 'DELETE'}, data),
      responseType: 'json',
      callback: callback
    });
  }
}

