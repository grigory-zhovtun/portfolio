/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc() {
  const result = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio;

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }

    if (sex === 'female') {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }

  calcTotal();

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.classList.remove(activeClass);

      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }

      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.addEventListener('click', e => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }

        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = 'none';
      }

      switch (input.getAttribute('id')) {
        case "height":
          height = +input.value;
          break;

        case "weight":
          weight = +input.value;
          break;

        case "age":
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function cards() {
  class Cards {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = +this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.classes.push('menu__item');
      }

      this.classes.forEach(className => element.classList.add(className));
      element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
      this.parent.append(element);
    }

  }

  Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResource"])('http://localhost:3000/menu').then(data => {
    data.forEach(item => {
      const {
        img,
        altimg,
        title,
        descr,
        price
      } = item;
      new Cards(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");



function forms(formSelector, modalTimer) {
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с Вами свяжемся',
    failure: 'Что-то пошло не так'
  };
  forms.forEach(item => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', json).then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    Object(_modal__WEBPACK_IMPORTED_MODULE_0__["showMdl"])('.modal', modalTimer);
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('.modal__dialog');
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeMdl"])('.modal');
    }, 4000);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/*! exports provided: default, showMdl, closeMdl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showMdl", function() { return showMdl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeMdl", function() { return closeMdl; });
function showMdl(modalSelector, modalTimer) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show', 'fade');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (modalTimer) {
    clearInterval(modalTimer);
  }
}

function closeMdl(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimer) {
  const btnModal = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
  btnModal.forEach(btn => {
    btn.addEventListener('click', () => showMdl(modalSelector, modalTimer));
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeMdl(modalSelector);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeMdl(modalSelector);
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      showMdl(modalSelector, modalTimer);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider(_ref) {
  let {
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currnetCounter
  } = _ref;
  const arrowLeft = document.querySelector(prevArrow),
        arrowRight = document.querySelector(nextArrow),
        currentNum = document.querySelector(currnetCounter),
        totalNum = document.querySelector(totalCounter),
        slides = document.querySelectorAll(slide),
        slider = document.querySelector(container);
  let numCurrentSlide = 0;
  let numCountSlides = slides.length;

  function hideSlides() {
    slides.forEach(slide => {
      slide.classList.add('hide');
      slide.classList.remove('show');
    });
  }

  hideSlides();
  showSlide(0);
  slider.style.position = 'relative';
  const indicators = document.createElement('ol'),
        dots = [];
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  currentNum.textContent = `01`;
  totalNum.textContent = `0${numCountSlides}`;

  function addZero(num) {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num + '';
    }
  }

  function showSlide(currentSlide) {
    hideSlides();
    slides[currentSlide].classList.remove('hide');
    slides[currentSlide].classList.add('show');
  }

  showSlide(numCurrentSlide);

  function activeDot(slideIndex) {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  }

  arrowLeft.addEventListener('click', () => {
    numCurrentSlide--;

    if (numCurrentSlide < 0) {
      numCurrentSlide = numCountSlides - 1;
    }

    currentNum.textContent = addZero(numCurrentSlide + 1);
    showSlide(numCurrentSlide);
    activeDot(numCurrentSlide + 1);
  });
  arrowRight.addEventListener('click', () => {
    numCurrentSlide++;

    if (numCurrentSlide > numCountSlides - 1) {
      numCurrentSlide = 0;
    }

    currentNum.textContent = addZero(numCurrentSlide + 1);
    showSlide(numCurrentSlide);
    activeDot(numCurrentSlide + 1);
  });
  dots.forEach((dot, ind) => {
    dot.addEventListener('click', () => {
      numCurrentSlide = ind;
      showSlide(ind);
      activeDot(ind + 1);
      currentNum.textContent = addZero(ind + 1);
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(id, deadline) {
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / 1000 / 60 % 60),
          seconds = Math.floor(t / 1000 % 60);
    return {
      t,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = document.querySelector('#days'),
          hours = document.querySelector('#hours'),
          minutes = document.querySelector('#minutes'),
          seconds = document.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = coupleNumbers(t.days);
      hours.innerHTML = coupleNumbers(t.hours);
      minutes.innerHTML = coupleNumbers(t.minutes);
      seconds.innerHTML = coupleNumbers(t.seconds);

      if (t.t <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  function coupleNumbers(count) {
    if (+count < 10) {
      return `0${count}`;
    } else {
      return count;
    }
  }

  setClock(id, deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");










window.addEventListener('DOMContentLoaded', () => {
  const modalTimer = setTimeout(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_2__["showMdl"])('.modal', modalTimer), 30000);
  Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  Object(_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', '2022-04-11');
  Object(_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modal]', '.modal', modalTimer);
  Object(_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  Object(_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimer);
  Object(_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currnetCounter: '#current',
    slide: '.offer__slide'
  });
  Object(_modules_calc__WEBPACK_IMPORTED_MODULE_5__["default"])();
});

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/*! exports provided: postData, getResource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResource", function() { return getResource; });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });
  return await res.json();
};

const getResource = async url => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not find ${url}, status: ${res.status}`);
  }

  return await res.json();
};




/***/ })

/******/ });
//# sourceMappingURL=script.js.map