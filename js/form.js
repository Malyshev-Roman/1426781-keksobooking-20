'use strict';

(function () {

  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
  var mapFilters = document.querySelector('.map__filters-container');
  var mapFiltersForm = mapFilters.querySelector('.map__filters');
  var adFormHeader = adForm.querySelector('.ad-form-header');
  var typeInput = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var submitBtn = document.querySelector('.ad-form__submit');
  var resetBtn = document.querySelector('.ad-form__reset');
  var errorTemplate = document.querySelector('#error');
  var errorDiv = errorTemplate.content.querySelector('.error');
  var successTemplate = document.querySelector('#success');
  var successDiv = successTemplate.content.querySelector('.success');
  var main = document.querySelector('main');
  var isActivate = false;
  var roomsValues = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

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
  };

  var successHandler = function (ads) {
    window.ads = ads.map(function (ad, index) {
      return Object.assign({}, ad, {id: index});
    });
    window.map.createPins(window.ads);
    mapFiltersForm.classList.remove('hidden');
  };

  mapFiltersForm.classList.add('hidden');

  var formActivate = function (evt) {
    if (!isActivate && evt.button === 0) {
      activationForm();
      window.backend.load(successHandler, window.data.error);
    }
    window.map.address();
    mapPinMain.removeEventListener('mousedown', formActivate);
    resetBtn.resetEventListener('click', resetBtnHandler);
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
    window.card.remove();
    window.map.deactivate();
    window.avatar.resetMap();
    window.avatar.resetHousing();
    mapFiltersForm.classList.add('hidden');
    mapPinMain.addEventListener('mousedown', formActivate);
    adForm.classList.add('ad-form--disabled');
    window.map.getMapCoords();
  };

  var resetBtnHandler = function (evt) {
    evt.preventDefault();
    deactivationForm();
    window.loadImage.remove();
  };
  resetBtn.addEventListener('click', resetBtnHandler);

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
      default: priceInput.placeholder = '1000';
    }
  });

  timeInInput.addEventListener('change', function (evt) {
    timeOutInput.value = evt.target.value;
  });

  timeOutInput.addEventListener('change', function (evt) {
    timeInInput.value = evt.target.value;
  });

  var disableСapacityOptions = function (inputValue) {
    var capacityOptions = capacitySelect.querySelectorAll('option');
    for (var t = 0; t < capacityOptions.length; t++) {
      capacityOptions[t].disabled = true;
    }
    for (var i = 0; i < roomsValues[inputValue].length; i++) {
      capacitySelect.querySelector('option' + '[value="' + roomsValues[inputValue][i] + '"]').disabled = false;
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

  var showErrorMessage = function (errMessage) {
    var errorElement = errorDiv.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorButton = errorElement.querySelector('.error__button');
    var closeMsg = function () {
      errorElement.classList.add('hidden');
    };
    errorButton.addEventListener('click', closeMsg);
    main.addEventListener('mousedown', closeMsg);
    main.addEventListener('keydown', function (evt) {
      if (evt.key === window.ESC_KEY) {
        closeMsg();
      }
    });
    errorMessage.textContent = errMessage;
    main.appendChild(errorElement);
  };
  var showSuccessMessage = function () {
    var successElement = successDiv.cloneNode(true);
    var successMessage = successElement.querySelector('.success__message');
    var removeMsg = function () {
      successElement.classList.add('hidden');
    };
    main.addEventListener('mousedown', removeMsg);
    main.addEventListener('keydown', function (evt) {
      if (evt.key === window.ESC_KEY) {
        removeMsg();
      }
    });
    var msg = successMessage.textContent;
    main.appendChild(successElement);
    return msg;
  };

  var onSubmitError = function (errorMessage) {
    showErrorMessage(errorMessage);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(adForm);
    window.backend.save(formData, showSuccessMessage, onSubmitError);
    deactivationForm();
  });

  window.form = {
    activation: activationForm
  };
}());
