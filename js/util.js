'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  window.ESC_KEY = 'Escape';
  window.ENTER_KEY = 'Enter';

  var onEscDownKey = function (evt) {
    if (evt.key === window.ESC_KEY) {
      window.card.remove();
    }
  };

  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getElementArray = function (arr) {
    var rand = arr.slice();
    return rand.splice(rand.indexOf(rand[window.util.random(0, rand.length - 1)]), 1);
  };

  var callDebounce = function (fun) {
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
  };

  window.util = {

    onEscDown: onEscDownKey,
    random: getRandom,
    getElement: getElementArray,
    debounce: callDebounce
  };
}());
