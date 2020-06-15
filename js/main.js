'use strict';

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
var TITLES = [
  'Большая квартира',
  'Маленькая квартира',
  'Шикарный дворец',
  'Маленький дворец',
  'Современный гостевой домик',
  'Простой гостевой домик',
  'Комфортное бунгало далеко от моря',
  'Скромное бунгало по колено в воде',
];

var GUESTS = {
  MIN: 1,
  MAX: 10
};

var ROOMS = {
  MIN: 1,
  MAX: 5
};

var PRICES = {
  MIN: 1000,
  MAX: 1000000
};

var PIN_WIDTH = 40;
var PIN_HEIGHT = 44;
var PIN_MAX_Y = 630 - PIN_HEIGHT;
var PIN_MIN_Y = 130;
var PINS_COUNTS = 8;

var mapAdvert = document.querySelector('.map');

var mapWidth = mapAdvert.offsetWidth;
var mapPinElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var cardAdvert = document.querySelector('#card');
var mapCard = cardAdvert.content.querySelector('.map__card');
var popupPhoto = cardAdvert.content.querySelector('.popup__photo');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
var adFormHeader = adForm.querySelector('.ad-form-header');
var addressInput = adForm.querySelector('#address');
var success = document.querySelector('.success');
var typeInput = document.querySelector('#type');
var priceInput = document.querySelector('#price');
var timeInInput = document.querySelector('#timein');
var timeOutInput = document.querySelector('#timeout');
var roomNumberSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');
var submitBtn = document.querySelector('.ad-form__submit');
var isActivate = false;

var advertArr = [];

var typeHouse = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

adFormHeader.disabled = true;

for (var l = 0; l < adFormFieldsets.length; l++) {
  adFormFieldsets[l].disabled = true;
}

var onEscDown = function (evt, popup) {
  if (evt.key === 'Escape') {
    popup.remove();
  }
};

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var arrayElement = function (arr) {
  var rand = arr.slice();
  return rand.splice(rand.indexOf(rand[getRandom(0, rand.length - 1)]), 1);
};

var photosArray = function (arr) {
  var copyArr = arr.slice(0);
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = copyArr[i];
    copyArr[i] = copyArr[j];
    copyArr[j] = temp;
  }
  return copyArr;
};

var createAdverts = function (i) {
  var pinCoordX = getRandom(PIN_WIDTH, mapWidth - PIN_WIDTH);
  var pinCoordY = getRandom(PIN_MIN_Y, PIN_MAX_Y);
  var pins = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: arrayElement(TITLES),
      address: pinCoordX + ', ' + pinCoordY,
      price: getRandom(PRICES.MIN, PRICES.MAX),
      type: TYPES[getRandom(0, TYPES.length - 1)],
      rooms: getRandom(ROOMS.MIN, ROOMS.MAX),
      guests: getRandom(GUESTS.MIN, GUESTS.MAX),
      checkin: TIMES[getRandom(0, TIMES.length - 1)],
      checkout: TIMES[getRandom(0, TIMES.length - 1)],
      features: arrayElement(FEATURES),
      description: '',
      photos: photosArray(PHOTOS)
    },
    location: {
      x: pinCoordX,
      y: pinCoordY
    }
  };
  return pins;
};

var createAdvertArr = function (counts) {
  for (var k = 0; k < counts; k++) {
    advertArr[k] = createAdverts(k);
  }
  return advertArr;
};

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
    createCard(pin);
    document.addEventListener('keydown', onEscDown);
  });
  return mapElement;
};

var createFragment = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPinMap(pins[i]));
  }
  mapPinElement.appendChild(fragment);
};

var createFeatureFragment = function (feature) {
  var featureFragment = document.createDocumentFragment();
  for (var i = 0; i < feature.offer.features.length; i++) {
    var featureItem = document.createElement('li');
    featureItem.className = 'popup__feature popup__feature--' + feature.offer.features[i];
    featureFragment.appendChild(featureItem);
  }
  return featureFragment;
};

var createPhotosFragment = function (photo) {
  var photosFragment = document.createDocumentFragment();
  for (var i = 0; i < photo.offer.photos.length; i++) {
    var photoItem = popupPhoto.cloneNode(true);
    photoItem.src = photo.offer.photos[i];
    photosFragment.appendChild(photoItem);
  }
  return photosFragment;
};

var createCard = function (cards) {
  var card = mapCard.cloneNode(true);
  card.querySelector('.map__card img').src = cards.author.avatar;
  card.querySelector('.popup__title').textContent = cards.offer.title;
  card.querySelector('.popup__text--address').textContent = cards.offer.address;
  card.querySelector('.popup__text--price').textContent = cards.offer.price + ' ₽/ночь';
  card.querySelector('.popup__type').textContent = typeHouse[cards.offer.type];
  card.querySelector('.popup__text--capacity').textContent = cards.offer.rooms + ' комнаты для ' + cards.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cards.offer.checkin + ', выезд до ' + cards.offer.checkout;
  card.querySelector('.popup__features').innerHTML = '';
  card.querySelector('.popup__features').appendChild(createFeatureFragment(cards));
  card.querySelector('.popup__description').textContent = cards.offer.description;
  card.querySelector('.popup__photos').removeChild(card.querySelector('.popup__photo'));
  card.querySelector('.popup__photos').appendChild(createPhotosFragment(cards));
  mapFiltersContainer.insertAdjacentElement('beforebegin', card);
  var closeAd = card.querySelector('.popup__close');
  closeAd.addEventListener('click', function () {
    card.remove();
    document.removeEventListener('click', onEscDown);
  });
  return card;
};

var getMapPinMainCoords = function () {
  var mapPinMainPosition = {
    x: mapPinMain.offsetLeft + Math.floor(mapPinMain.offsetWidth / 2),
    y: mapPinMain.offsetTop + mapPinMain.offsetHeight
  };
  return mapPinMainPosition;
};

var fillAddress = function () {
  var addressInputCoords = getMapPinMainCoords();
  addressInput.value = addressInputCoords.x + ', ' + addressInputCoords.y;
};

var activationForm = function () {
  mapAdvert.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = false;
  }
  adFormHeader.disabled = false;
  fillAddress();
};

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activationForm();
    createFragment(createAdvertArr(PINS_COUNTS));
  }
});

var formActivate = function (evt) {
  if (!isActivate && evt.button === 0) {
    activationForm();
    createFragment(createAdvertArr(PINS_COUNTS));
  }
  fillAddress();
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
  if (mapCard) {
    mapCard.remove();
  }
  mapPinMain.top = '375px';
  mapPinMain.left = '570px';
  addressInput.value = (mapPinMain.offsetTop - mapPinMain.offsetHeight / 2) + ', ' + (mapPinMain.offsetLeft - mapPinMain.offsetWidth / 2);
  mapAdvert.classList.add('map--faded');
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
    if (evt.key === 'Escape') {
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
