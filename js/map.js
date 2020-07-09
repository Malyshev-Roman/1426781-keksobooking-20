'use strict';

(function () {

  var PINS_COUNT = 5;
  var PIN_MAP_WIDTH = 50;
  var PIN_ARROW_HEIGHT = 70;
  var PIN_MAP_HEIGHT = 69;
  var PIN_ARROW_WIDTH = 84 - PIN_ARROW_HEIGHT;
  var mapAdvert = document.querySelector('.map');
  window.mapWidth = mapAdvert.offsetWidth;
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinElement = document.querySelector('.map__pins');
  var adMap = document.querySelector('.ad-form');
  var addressInput = adMap.querySelector('#address');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPinMap = function (pin, adId) {
    var mapElement = pinTemplate.cloneNode(true);
    var mapImg = mapElement.querySelector('img');

    mapElement.style.left = pin.location.x - (PIN_MAP_WIDTH / 2) + 'px';
    mapElement.style.top = pin.location.y - PIN_MAP_HEIGHT + 'px';
    mapImg.src = pin.author.avatar;
    mapImg.alt = pin.offer.title;
    mapElement.setAttribute('id', String(adId));
    mapElement.addEventListener('click', function () {
      var mapCardRemovable = mapAdvert.querySelector('.map__card');
      if (mapCardRemovable) {
        mapCardRemovable.remove();
      }
      window.card.create(pin);
      document.addEventListener('keydown', window.util.onEscDown);
    });
    return mapElement;
  };

  var mapActivate = function (evt) {
    if (evt.key === window.ENTER_KEY) {
      window.form.activation();
    }
    mapPinMain.removeEventListener('keydown', mapActivate);
  };

  var createFragment = function (pins) {
    var fragment = document.createDocumentFragment();
    var map = document.querySelector('.map');
    pins.slice(0, PINS_COUNT).forEach(function (ad) {
      fragment.appendChild(renderPinMap(ad, ad.id));
    });
    mapPinElement.appendChild(fragment);
    window.mapPins = map.querySelectorAll('button[type="button"]');
  };

  var getMapPinMainCoords = function () {
    var mapPinMainPosition = {
      x: mapPinMain.offsetLeft + Math.floor(mapPinMain.offsetWidth / 2),
      y: mapPinMain.offsetTop + mapPinMain.offsetHeight + PIN_ARROW_WIDTH
    };
    return mapPinMainPosition;
  };

  var mapDeactivate = function () {
    if (window.mapCard) {
      window.mapCard.remove();
    }
    mapPinMain.style.top = '375px';
    mapPinMain.style.left = '570px';
    addressInput.value = (mapPinMain.offsetTop - mapPinMain.offsetHeight / 2) + ', ' + (mapPinMain.offsetLeft - mapPinMain.offsetWidth / 2);
    mapAdvert.classList.add('map--faded');
  };

  var fillAddress = function () {
    var addressInputCoords = window.map.getMapCoords();
    addressInput.value = addressInputCoords.x + ', ' + addressInputCoords.y;
  };

  mapPinMain.addEventListener('keydown', mapActivate);

  window.map = {

    createPins: createFragment,
    getMapCoords: getMapPinMainCoords,
    deactivate: mapDeactivate,
    address: fillAddress,
    render: renderPinMap
  };
}());
