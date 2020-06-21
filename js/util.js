'use strict';

(function () {

  window.ESC_KEY = 'Escape';
  window.ENTER_KEY = 'Enter';

  window.util = {

    onEscDown: function (evt, popup) {
      if (evt.key === window.ESC_KEY) {
        popup.remove();
      }
    },

    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getElementArray: function (arr) {
      var rand = arr.slice();
      return rand.splice(rand.indexOf(rand[window.util.getRandom(0, rand.length - 1)]), 1);
    },

  };
}());
