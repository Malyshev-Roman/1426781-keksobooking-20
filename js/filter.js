'use strict';

(function () {

  var mapFilters = document.querySelector('.map__filters-container');
  var mapFiltersForm = mapFilters.querySelector('.map__filters');
  var renderPins = window.map.createFragment;
  var removePins = window.pin.removePins;

  var mapFiltersChangeHandler = function () {
    window.util.debounce(updatePins());
  };

  var updatePins = function () {
    window.card.removeCard();
    removePins(window.mapPins);
    var housingType = document.querySelector('#housing-type').value;

    renderPins(window.ads.filter(function (ad) {

      if (housingType === 'any') {
        return true;
      }

      return ad.offer.type === housingType;

    }));

  };

  mapFiltersForm.addEventListener('change', mapFiltersChangeHandler);


})();
