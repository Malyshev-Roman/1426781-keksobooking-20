'use strict';

(function () {

  var advertArr = [];

  window.data = {

    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    arrayElement: function (arr) {
      var rand = arr.slice();
      return rand.splice(rand.indexOf(rand[window.data.getRandom(0, rand.length - 1)]), 1);
    },

    createAdvertArr: function (counts) {
      for (var k = 0; k < counts; k++) {
        advertArr[k] = window.pin.createAdverts(k);
      }
      return advertArr;
    }
  };

}());
