/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  // подготовим url и параметры запроса
  const method = options.method.toUpperCase();
  const url = new URL(options.url);
  let formData;
  if (options.data) {
    if (method === 'GET') {
      for (let key in options.data) {
        url.searchParams.set(key, options.data[key]);
      }
    } else {
      formData = new FormData();
      for (let key in options.data) {
        formData.append(key, options.data[key]);
      }
    }
  }

  // теперь создадим объект запроса и установим опции
  const xhr = new XMLHttpRequest();
  try {
    xhr.open(method, url);
    if (options.headers) {
      for(let key in options.headers) {
        xhr.setRequestHeader(key, options.headers[key]);
      }
    }
    xhr.responseType = options.responseType ? options.responseType : 'json';
    xhr.withCredentials = true;
    if (options.callback) {
      xhr.addEventListener('readystatechange', function() {
        if (this.readyState == request.DONE && this.status == 200) {
          console.log(this.responseText);
          const response = JSON.parse(this.responseText);
          if (response.success) {
            options.callback(null, response);
          } else {
            options.response(response.error);
          }
        }
      });
    }
    xhr.send(formData);
  } catch (e) {
    if (options.callback) {
      options.collback(e);
    }
  }
  return xhr;
};
