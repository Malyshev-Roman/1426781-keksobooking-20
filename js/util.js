'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  window.ESC_KEY = 'Escape';
  window.ENTER_KEY = 'Enter';

  window.util = {

    onEscDown: function (evt) {
      if (evt.key === window.ESC_KEY) {
        window.card.removeCard();
      }
    },

    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getElementArray: function (arr) {
      var rand = arr.slice();
      return rand.splice(rand.indexOf(rand[window.util.getRandom(0, rand.length - 1)]), 1);
    },
    debounce: function (fun) {
      var lastTimeout = null;
      return function () {
        var args = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          fun.apply(null, args);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
}());
