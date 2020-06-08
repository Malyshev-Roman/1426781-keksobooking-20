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
var PIN_MAX_Y = 630;
var PIN_MIN_Y = 130;
var PINS_COUNTS = 8;

var mapAdvert = document.querySelector('.map');
mapAdvert.classList.remove('map--faded');

var mapWidth = mapAdvert.offsetWidth;
var mapPinElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var cardAdvert = document.querySelector('#card');
var mapCard = cardAdvert.content.querySelector('.map__card');
var popupPhoto = cardAdvert.content.querySelector('.popup__photo');
var mapFiltersContainer = document.querySelector('.map__filters-container');

var advertArr = [];

var typeHouse = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
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

  mapElement.style.left = (pin.location.x - PIN_WIDTH) + 'px';
  mapElement.style.top = (pin.location.y - PIN_HEIGHT) + 'px';
  mapImg.src = pin.author.avatar;
  mapImg.alt = pin.offer.title;
  return mapElement;
};

var createFragment = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPinMap(pins[i]));
  }
  mapPinElement.appendChild(fragment);
};
createFragment(createAdvertArr(PINS_COUNTS));

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
  return card;
};

mapFiltersContainer.insertAdjacentElement('beforebegin', createCard(advertArr[0]));

