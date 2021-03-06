'use strict';

(function () {

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '26px';
    node.style.fontFamily = '"Roboto", "Arial", sans-serif';
    node.style.color = 'black';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var getPhotosArray = function (arr) {
    var copyArr = arr.slice(0);
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copyArr[i];
      copyArr[i] = copyArr[j];
      copyArr[j] = temp;
    }
    return copyArr;
  };

  window.data = {

    getPhotos: getPhotosArray,
    error: errorHandler
  };

}());
