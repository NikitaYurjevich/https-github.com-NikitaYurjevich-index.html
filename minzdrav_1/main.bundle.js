/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/scss/styles.scss":
/*!******************************!*\
  !*** ./app/scss/styles.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./app/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/styles.scss */ "./app/scss/styles.scss");

var LIFETIME_SECOND_SLIDE = 3400;
var LIFETIME_THIRD_SLIDE = 3100;
var TIME_TO_SHOW_SECOND_SLIDE = 2500;
var TIME_TO_HIDE_FIRST_SLIDE = 200;
var TIME_TO_SHOW_THIRD_SLIDE = TIME_TO_SHOW_SECOND_SLIDE + LIFETIME_SECOND_SLIDE;
var TIME_TO_SHOW_FOURTH_SLIDE = TIME_TO_SHOW_THIRD_SLIDE + LIFETIME_THIRD_SLIDE;
var TIME_TO_SHOW_FIFTH_SLIDE = TIME_TO_SHOW_THIRD_SLIDE + LIFETIME_THIRD_SLIDE * 2;
var firstSlide = document.getElementById('firstSlide');
var secondSlide = document.getElementById('secondSlide');
var thirdSlide = document.getElementById('thirdSlide');
var fourthSlide = document.getElementById('fourthSlide');
var fifthSlide = document.getElementById('fifthSlide');
setTimeout(function () {
  secondSlide.style.display = 'block';
}, TIME_TO_SHOW_SECOND_SLIDE);
setTimeout(function () {
  firstSlide.style.display = 'none';
}, TIME_TO_SHOW_SECOND_SLIDE + TIME_TO_HIDE_FIRST_SLIDE);
setTimeout(function () {
  secondSlide.style.display = 'none';
  thirdSlide.style.display = 'block';
}, TIME_TO_SHOW_THIRD_SLIDE);
setTimeout(function () {
  thirdSlide.style.display = 'none';
  fourthSlide.style.display = 'block';
}, TIME_TO_SHOW_FOURTH_SLIDE);
setTimeout(function () {
  fourthSlide.style.display = 'none';
  fifthSlide.style.display = 'block';
}, TIME_TO_SHOW_FIFTH_SLIDE);
})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map