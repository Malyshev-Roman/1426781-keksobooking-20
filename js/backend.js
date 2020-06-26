'use strict';

(function () {
  var url = {
    DOWNLOAD: 'https://javascript.pages.academy/keksobooking/data',
    UPLOAD: 'https://javascript.pages.academy/keksobooking'
  };

  var ServerCode = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    ENTERNAL_ERROR: 500
  };

  var createXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case ServerCode.SUCCESS:
          onLoad(xhr.response);
          break;
        case ServerCode.BAD_REQUEST:
          onError('Произошла ошибка сервера: неверный запрос');
          break;
        case ServerCode.NOT_FOUND:
          onError('Произошла ошибка сервера: запрашиваемый ресурс не найден');
          break;
        case ServerCode.ENTERNAL_ERROR:
          onError('Произошла внутренняя ошибка сервера');
          break;
        default:
          onError('Произошла ошибка сервера: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос к серверу не успел выполниться за отведённое время');
    });

    return xhr;
  };

  var loadData = function (onLoad, onError) {
    var xhr = createXHR(onLoad, onError);

    xhr.open('GET', url.DOWNLOAD);
    xhr.send();
  };

  var saveData = function (data, onLoad, onError) {
    var xhr = createXHR(onLoad, onError);

    xhr.open('POST', url.UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    save: saveData,
    load: loadData
  };

})();
