'use strict';

(function () {

  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
  var adFormHeader = adForm.querySelector('.ad-form-header');
  var success = document.querySelector('.success');
  var typeInput = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var submitBtn = document.querySelector('.ad-form__submit');
  var isActivate = false;
  adFormHeader.disabled = true;

  for (var l = 0; l < adFormFieldsets.length; l++) {
    adFormFieldsets[l].disabled = true;
  }

  var activationForm = function () {
    var mapAdvert = document.querySelector('.map');
    mapAdvert.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].disabled = false;
    }
    adFormHeader.disabled = false;
    window.map.fillAddress();
  };

  var formActivate = function (evt) {
    if (!isActivate && evt.button === 0) {
      activationForm();
      window.backend.load(window.map.createFragment, window.data.errorHandler);
    }
    mapPinMain.removeEventListener('mousedown', formActivate);
    window.map.fillAddress();
  };

  mapPinMain.addEventListener('mousedown', formActivate);

  var deactivationForm = function () {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    adForm.reset();
    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].disabled = true;
    }
    adFormHeader.disabled = true;
    for (var j = 0; j < mapPinsItems.length; j++) {
      mapPinsItems[j].remove();
    }
    window.map.mapDeactivate();
    adForm.classList.add('ad-form--disabled');
  };

  typeInput.addEventListener('change', function (evt) {
    switch (evt.target.value) {
      case 'bungalo':
        priceInput.min = 0;
        priceInput.placeholder = '0';
        break;
      case 'flat':
        priceInput.min = 1000;
        priceInput.placeholder = '1000';
        break;
      case 'house':
        priceInput.min = 5000;
        priceInput.placeholder = '5000';
        break;
      case 'palace':
        priceInput.min = 10000;
        priceInput.placeholder = '10000';
        break;
    }
  });

  timeInInput.addEventListener('change', function (evt) {
    timeOutInput.value = evt.target.value;
  });

  timeOutInput.addEventListener('change', function (evt) {
    timeInInput.value = evt.target.value;
  });

  var roomsValues = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var disableСapacityOptions = function (inputValue) {
    var capacityOptions = capacitySelect.querySelectorAll('option');
    for (var t = 0; t < capacityOptions.length; t++) {
      capacityOptions[t].disabled = true;
    }
    for (var i = 0; i < roomsValues[inputValue].length; i++) {
      capacitySelect.querySelector('option' + '[value="' + roomsValues[inputValue][i] + '"]').disabled = false;
      capacitySelect.value = roomsValues[inputValue][i];
    }
  };

  var checkСapacity = function () {
    disableСapacityOptions(roomNumberSelect.value);
  };

  roomNumberSelect.addEventListener('change', checkСapacity);

  var checkPlaceValidity = function () {
    var roomGuests = roomsValues[roomNumberSelect.value];
    if (roomGuests.indexOf(+capacitySelect.value) === -1) {
      roomNumberSelect.addEventListener('change', checkСapacity);
      capacitySelect.setCustomValidity('Количество гостей не влезут в выбранную комнату');
    } else {
      capacitySelect.setCustomValidity('');
    }
  };

  roomNumberSelect.addEventListener('change', function (evt) {
    evt.target.setCustomValidity('');
  });

  capacitySelect.addEventListener('change', function (evt) {
    evt.target.setCustomValidity('');
  });

  submitBtn.addEventListener('click', checkPlaceValidity);

  var successHidden = function () {
    success.classList.add('hidden');
  };

  var showSuccess = function () {
    success.classList.remove('hidden');
    success.addEventListener('keydown', function (evt) {
      if (evt.key === window.ESC_KEY) {
        success.classList.add('hidden');
      }
    });
    document.addEventListener('click', successHidden);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    showSuccess();
    deactivationForm();
  });

  window.form = {
    activationForm: activationForm
  };
}());
