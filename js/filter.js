'use strict';

(function () {

  var mapFilters = document.querySelector('.map__filters-container');
  var mapFiltersForm = mapFilters.querySelector('.map__filters');
  var renderPins = window.map.createPins;
  var removePins = window.pin.remove;

  var mapFiltersChangeHandler = function () {
    window.util.debounce(updatePins());
  };

  var updatePins = function () {
    window.card.remove();
    removePins(window.mapPins);
    var housingType = document.querySelector('#housing-type').value;
    var housingPrice = document.querySelector('#housing-price').value;
    var housingRooms = document.querySelector('#housing-rooms').value;
    var housingGuests = document.querySelector('#housing-guests').value;
    var selectedFeatures = Array.from(document.querySelectorAll('.map__checkbox:checked')).map(function (checkbox) {
      return checkbox.value;
    });

    renderPins(window.ads.filter(function (ad) {

      return housingType === 'any' || ad.offer.type === housingType;

    }).filter(function (ad) {
      switch (housingPrice) {
        case 'any':
          return true;
        case 'middle':
          return ad.offer.price >= 10000 && ad.offer.price <= 50000;
        case 'low':
          return ad.offer.price <= 9999;
        default:
          return ad.offer.price >= 50001;
      }

    }).filter(function (ad) {

      return housingRooms === 'any' || ad.offer.rooms === Number(housingRooms);

    }).filter(function (ad) {

      return housingGuests === 'any' || ad.offer.guests === Number(housingGuests);

    }).filter(function (element) {
      return selectedFeatures.every(function (feature) {
        return element.offer.features.includes(feature);
      });
    }));

  };

  mapFiltersForm.addEventListener('change', mapFiltersChangeHandler);

})();
