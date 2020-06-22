'use strict';

(function () {
  var cardAdvert = document.querySelector('#card');
  window.mapCard = cardAdvert.content.querySelector('.map__card');
  var popupPhoto = cardAdvert.content.querySelector('.popup__photo');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

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

  var typeHouse = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  window.card = {

    createCard: function (cards) {
      var card = window.mapCard.cloneNode(true);
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
        document.removeEventListener('click', window.util.onEscDown);
      });
      return card;
    },
  };
}());
