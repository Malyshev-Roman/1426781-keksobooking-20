'use strict';

(function () {

  // var FEATURES = [
  //   'wifi',
  //   'dishwasher',
  //   'parking',
  //   'washer',
  //   'elevator',
  //   'conditioner'
  // ];
  // var PHOTOS = [
  //   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  // ];
  // var TYPES = [
  //   'palace',
  //   'flat',
  //   'house',
  //   'bungalo'
  // ];
  // var TIMES = [
  //   '12:00',
  //   '13:00',
  //   '14:00'
  // ];
  // var TITLES = [
  //   'Большая квартира',
  //   'Маленькая квартира',
  //   'Шикарный дворец',
  //   'Маленький дворец',
  //   'Современный гостевой домик',
  //   'Простой гостевой домик',
  //   'Комфортное бунгало далеко от моря',
  //   'Скромное бунгало по колено в воде',
  // ];

  // var GUESTS = {
  //   MIN: 1,
  //   MAX: 10
  // };

  // var ROOMS = {
  //   MIN: 1,
  //   MAX: 5
  // };

  // var PRICES = {
  //   MIN: 1000,
  //   MAX: 1000000
  // };

  window.PIN_WIDTH = 40;
  window.PIN_HEIGHT = 44;
  // var PIN_MAX_Y = 630 - window.PIN_HEIGHT;
  // var PIN_MIN_Y = 130;

  // var createAdverts = function (i) {
  //   var pinCoordX = window.util.random(window.PIN_WIDTH, window.mapWidth - window.PIN_WIDTH);
  //   var pinCoordY = window.util.random(PIN_MIN_Y, PIN_MAX_Y);
  //   var pins = {
  //     author: {
  //       avatar: 'img/avatars/user0' + (i + 1) + '.png'
  //     },
  //     offer: {
  //       title: window.util.getElement(TITLES),
  //       address: pinCoordX + ', ' + pinCoordY,
  //       price: window.util.random(PRICES.MIN, PRICES.MAX),
  //       type: TYPES[window.util.random(0, TYPES.length - 1)],
  //       rooms: window.util.random(ROOMS.MIN, ROOMS.MAX),
  //       guests: window.util.random(GUESTS.MIN, GUESTS.MAX),
  //       checkin: TIMES[window.util.random(0, TIMES.length - 1)],
  //       checkout: TIMES[window.util.random(0, TIMES.length - 1)],
  //       features: window.util.getElement(FEATURES),
  //       description: '',
  //       photos: window.data.getPhotos(PHOTOS)
  //     },
  //     location: {
  //       x: pinCoordX,
  //       y: pinCoordY
  //     }
  //   };
  //   return pins;
  // };

  var removePins = function (pins) {
    return pins.forEach(function (item) {
      item.remove();
    });
  };

  window.pin = {

    remove: removePins
  };

}());
