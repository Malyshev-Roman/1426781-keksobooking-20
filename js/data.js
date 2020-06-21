'use strict';

(function () {

  var advertArr = [];

  window.data = {

    createAdvertArr: function (counts) {
      for (var k = 0; k < counts; k++) {
        advertArr[k] = window.pin.createAdverts(k);
      }
      return advertArr;
    },

    getPhotosArray: function (arr) {
      var copyArr = arr.slice(0);
      for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = copyArr[i];
        copyArr[i] = copyArr[j];
        copyArr[j] = temp;
      }
      return copyArr;
    }
  };

}());
