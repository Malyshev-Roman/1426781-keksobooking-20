'use strict';

(function () {

  var ACTIVE_MAIN_PIN_WIDTH = 65;
  var ACTIVE_MAIN_PIN_HEIGHT = 75;

  var PIN_COORDS = {
    xCord: {
      min: 0,
      max: 1200
    },
    yCord: {
      min: 130,
      max: 630
    }
  };

  var adForm = document.querySelector('.ad-form');
  var addressField = adForm.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');

  var moveMapPinMain = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var pinTop = parseInt(mapPinMain.style.top, 10) + ACTIVE_MAIN_PIN_HEIGHT - shift.y;
      var pinLeft = parseInt(mapPinMain.style.left, 10) + Math.round(ACTIVE_MAIN_PIN_WIDTH / 2) - shift.x;

      if (pinTop >= PIN_COORDS.yCord.min && pinTop <= PIN_COORDS.yCord.max) {
        mapPinMain.style.top = pinTop - ACTIVE_MAIN_PIN_HEIGHT + 'px';
      } else {
        pinTop += shift.y;
      }

      if (pinLeft >= PIN_COORDS.xCord.min && pinLeft <= PIN_COORDS.xCord.max) {
        mapPinMain.style.left = pinLeft - ACTIVE_MAIN_PIN_WIDTH / 2 + 'px';
      } else {
        pinLeft += shift.x;
      }

      addressField.value = pinLeft + ', ' + pinTop;

    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  };

  var mapPinMainMouseDownHandlerMove = function (evt) {
    moveMapPinMain(evt);
  };

  mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandlerMove);

})();
