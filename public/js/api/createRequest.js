/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    console.log('options');
    console.log(options);
  // подготовим url и параметры запроса
  const method = options.method.toUpperCase();
  let url = options.url;
  let formData;
  if (options.data) {
    if (method === 'GET') {
      url += url.indexOf('?') >= 0 ? '&' : '?';
      for (let key in options.data) {
        url += key + '=' + encodeURI(options.data[key]) + '&';
      }
      url = url.slice(0, -1);
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
        if (this.readyState == xhr.DONE && this.status == 200) {
          let response = this.response;
          console.log(response);
          if (response && response.success) {
            options.callback(null, response);
          } else if (response && response.error) {
            options.callback(response.error);
          }
        }
      });
    }
    xhr.send(formData);
  } catch (e) {
    if (options.callback) {
      options.callback(e);
    }
  }
  return xhr;
};
