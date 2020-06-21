'use strict';

(function () {

  var PIN_ARROW_HEIGHT = 70;
  var PIN_ARROW_WIDTH = 84 - PIN_ARROW_HEIGHT;
  var mapAdvert = document.querySelector('.map');
  window.mapWidth = mapAdvert.offsetWidth;
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinElement = document.querySelector('.map__pins');
  var adMap = document.querySelector('.ad-form');
  var addressInput = adMap.querySelector('#address');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPinMap = function (pin) {
    var mapElement = pinTemplate.cloneNode(true);
    var mapImg = mapElement.querySelector('img');

    mapElement.style.left = pin.location.x + 'px';
    mapElement.style.top = pin.location.y + 'px';
    mapImg.src = pin.author.avatar;
    mapImg.alt = pin.offer.title;
    mapElement .addEventListener('click', function () {
      var mapCardRemovable = mapAdvert.querySelector('.map__card');
      if (mapCardRemovable) {
        mapCardRemovable.remove();
      }
      window.card.createCard(pin);
      document.addEventListener('keydown', window.util.onEscDown);
    });
    return mapElement;
  };

  var mapActivate = function (evt) {
    if (evt.key === window.ENTER_KEY) {
      window.form.activationForm();
    }
    mapPinMain.removeEventListener('keydown', mapActivate);
  };

  mapPinMain.addEventListener('keydown', mapActivate);

  window.map = {

    createFragment: function (pins) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < pins.length; i++) {
        fragment.appendChild(renderPinMap(pins[i]));
      }
      mapPinElement.appendChild(fragment);
    },

    getMapPinMainCoords: function () {
      var mapPinMainPosition = {
        x: mapPinMain.offsetLeft + Math.floor(mapPinMain.offsetWidth / 2),
        y: mapPinMain.offsetTop + mapPinMain.offsetHeight + PIN_ARROW_WIDTH
      };
      return mapPinMainPosition;
    },

    mapDeactivate: function () {
      if (window.mapCard) {
        window.mapCard.remove();
      }
      mapPinMain.top = '375px';
      mapPinMain.left = '570px';
      addressInput.value = (mapPinMain.offsetTop - mapPinMain.offsetHeight / 2) + ', ' + (mapPinMain.offsetLeft - mapPinMain.offsetWidth / 2);
      mapAdvert.classList.add('map--faded');
    },

    fillAddress: function () {
      var addressInputCoords = window.map.getMapPinMainCoords();
      addressInput.value = addressInputCoords.x + ', ' + addressInputCoords.y;
    }
  };
}());
