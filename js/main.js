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

var getRandom = function (min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

var arrayElement = function (arr) {
  var rand = arr.slice();
  return rand.splice(rand.indexOf(rand[getRandom(0, rand.length - 1)]), 1);
};

var photosArray = function (arr) {
  var temp;
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[i] = temp;
  }
  return arr;
};
var createAdverts = function () {
  var pins = [];

  for (var i = 0; i < PINS_COUNTS; i++) {
    var pinCoordX = getRandom(PIN_WIDTH, mapWidth - PIN_WIDTH);
    var pinCoordY = getRandom(PIN_MIN_Y, PIN_MAX_Y);
    var pin = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: arrayElement(TITLES),
        address: pinCoordX + ', ' + pinCoordY,
        price: getRandom(1000, 1000000),
        type: TYPES[getRandom(0, TYPES.length - 1)],
        rooms: getRandom(1, 5),
        guests: getRandom(1, 5),
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
    pins.push(pin);
  }
  return pins;
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
createFragment(createAdverts());
