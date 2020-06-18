'use strict';

(function () {

  var mapAdvert = document.querySelector('.map');
  window.mapWidth = mapAdvert.offsetWidth;
  var mapPinElement = document.querySelector('.map__pins');
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

  window.map = {

    createFragment: function (pins) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < pins.length; i++) {
        fragment.appendChild(renderPinMap(pins[i]));
      }
      mapPinElement.appendChild(fragment);
    },
  };
}());
