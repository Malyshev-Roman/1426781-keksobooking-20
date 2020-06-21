'use strict';

(function () {

  window.ESC_KEY = 'Escape';
  window.ENTER_KEY = 'Enter';

  window.util = {

    onEscDown: function (evt, popup) {
      if (evt.key === window.ESC_KEY) {
        popup.remove();
      }
    }

  };
}());
