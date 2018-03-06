'use strict';
// nav toggle script for mobile version
(function () {
  var navToggle = document.querySelector('.nav-toggle');

  navToggle.classList.remove('nav-toggle--no-js');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('nav-toggle--click');
  });

})();

//submenu button toggle script for mobile version
(function () {
  var submenuToggle = document.querySelector('.service-menu__name');

  submenuToggle.classList.remove('service-menu__name--nojs');

  // activate button submenu for mobile version
  if (document.documentElement.clientWidth < '768') {
    submenuToggle.disabled = false;
  }

  submenuToggle.addEventListener('click', function () {
    submenuToggle.classList.toggle('service-menu__name--click');
  });
})();
