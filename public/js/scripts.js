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


var links = document.querySelector('.certificates__list');

links.addEventListener('click', showImage);

function showImage(evt) {
  var target = evt.target.parentNode;
  if (target.classList.contains('certificates__link')) {
    evt.preventDefault();
    createOverlay();
  }
}

function createOverlay () {
  var footer = document.querySelector('.footer');
  var overlay = document.createElement('div');
  overlay.classList.add('overlay');
  var img = document.createElement('img');
  img.classList.add('frame');
  overlay.appendChild(sp4);
  var parentDiv = footer.parentNode;
  parentDiv.insertBefore(overlay, footer.nextSibling);
}
