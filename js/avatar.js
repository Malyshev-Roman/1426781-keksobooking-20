'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var AVATAR_WIDTH = 40;
  var AVATAR_HEIGHT = 44;
  var fileMapChooser = document.querySelector('.ad-form-header__input');
  var mapPreview = document.querySelector('.ad-form-header__preview img');
  var fileHousingChooser = document.querySelector('.ad-form__input');
  var housingPreview = document.querySelector('.ad-form__photo');
  var inputUpload = document.querySelector('.ad-form__upload');

  var uploadHousingImage = function () {
    var file = fileHousingChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        housingPreview.remove();
        var imageNode = document.createElement('img');
        var divNode = document.createElement('div');
        divNode.classList.add('ad-form__photo');
        imageNode.setAttribute('src', divNode.src = reader.result);
        imageNode.setAttribute('width', '70');
        imageNode.setAttribute('height', '70');
        divNode.appendChild(imageNode);
        inputUpload.insertAdjacentElement('afterend', divNode);
      });
      reader.readAsDataURL(file);
    }
  };

  var uploadMapImage = function () {
    var file = fileMapChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        mapPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var fileHousingChangeHandler = function () {
    uploadHousingImage();
  };

  var fileMapChangeHandler = function () {
    uploadMapImage();
  };

  var resetMapPreview = function () {
    mapPreview.setAttribute('src', DEFAULT_AVATAR);
    mapPreview.setAttribute('width', AVATAR_WIDTH);
    mapPreview.setAttribute('height', AVATAR_HEIGHT);
    mapPreview.setAttribute('alt', 'Аватар пользователя');
  };

  var resetHousingPreview = function () {
    var housingPreviews = document.querySelectorAll('.ad-form__photo');
    if (housingPreviews) {
      housingPreviews.forEach(function (el) {
        el.remove();
      });
    }

  };

  fileHousingChooser.addEventListener('change', fileHousingChangeHandler);
  fileMapChooser.addEventListener('change', fileMapChangeHandler);

  window.avatar = {
    resetMap: resetMapPreview,
    resetHousing: resetHousingPreview
  };

})();
