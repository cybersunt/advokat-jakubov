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

//script for displaying pictures in the modal window
(function() {
  var previewImageList = document.querySelector('.certificates__list');

  //create elements for modal window
  var image = document.createElement('img');
  var button = document.createElement('button');
  var galleryWrap = document.createElement('div');
  var container = document.createElement('section');
  var gallery = document.createElement('div');

  //щpening a window with a click on the photo
  previewImageList.addEventListener('click', function(evt) {
    checkElement(evt);
    window.addEventListener('keydown', onGalleryCloseKeyDown);
  });

  //open the window with the photo view by pressing the enter key
  previewImageList.addEventListener('keydown', function(evt) {
    checkKeyCode(evt);
    window.addEventListener('keydown', onGalleryCloseKeyDown);
  });

  //function of closing the window by pressing ESC and ENTER
  function onGalleryCloseKeyDown(evt) {
    checkKeyCode(evt);
    window.removeEventListener('keydown', onGalleryCloseKeyDown);
  }

  // click-close function
  function onGalleryCloseBtnClick() {
    deleteGallery();
    window.removeEventListener('keydown', onGalleryCloseKeyDown);
  }

  //the function that checks which key was pressed
  function checkKeyCode(evt) {
    var KEY_CODE = {
      ENTER: 13,
      ESC: 27
    };

    switch(evt.keyCode) {
      case KEY_CODE.ENTER:
      checkElement(evt);
      break;

      case KEY_CODE.ESC:
      deleteGallery();
      break;
    }
  }

  //function that checks which item is clicked
  function checkElement(evt) {
    evt.preventDefault();
    switch(evt.target.tagName) {
      case 'A':
      createGallery(evt.target);
      break;

      case 'IMG':
      createGallery(evt.target.parentNode);
      break;
      default:
      deleteGallery();
    }
  }

  //function that creates a modal window
  function createGallery(element) {
    addClassElements('gallery');
    image.src = element.href;
    button.type = 'button';

    galleryWrap.appendChild(button);
    galleryWrap.appendChild(image);
    gallery.appendChild(container);
    container.appendChild(galleryWrap);
    document.body.appendChild(gallery);

    button.addEventListener('click', onGalleryCloseBtnClick);
    button.addEventListener('keydown', onGalleryCloseKeyDown);

    function addClassElements(classElem) {
      gallery.classList.add(classElem);
      container.classList.add(classElem + '__container');
      galleryWrap.classList.add(classElem + '__wrap');
      image.classList.add(classElem + '__image');
      button.classList.add(classElem + '__btn-close');
    }
  }

  //function that removes the modal window
  function deleteGallery() {
    button.removeEventListener('click', onGalleryCloseBtnClick);
    button.removeEventListener('keydown', onGalleryCloseKeyDown);

    document.body.removeChild(gallery);
  }
})();
