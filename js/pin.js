'use strict';

(function () {

  window.PIN_WIDTH = 40;
  window.PIN_HEIGHT = 44;

  var removePins = function (pins) {
    return pins.forEach(function (item) {
      item.remove();
    });
  };

  window.pin = {

    remove: removePins
  };

}());
