/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/form/animations.js":
/*!***********************************!*\
  !*** ./src/js/form/animations.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initializeAnimations: () => (/* binding */ initializeAnimations)\n/* harmony export */ });\nconst initializeAnimations = () => {\r\n    // Fade in body\r\n    gsap.to(\"body\", {\r\n        opacity: 1,\r\n        duration: 2.2,\r\n        ease: \"power2.out\",\r\n        stagger: 0.15\r\n    });\r\n\r\n    // Common animation configuration\r\n    const defaultAnimation = {\r\n        opacity: 0,\r\n        y: 50,\r\n        duration: 1.5,\r\n        ease: \"power2.out\"\r\n    };\r\n\r\n    // Header animations\r\n    gsap.from(\".logo-container\", { ...defaultAnimation, y: -50 });\r\n    gsap.from(\".btn-masuk\", { ...defaultAnimation, duration: 1 });\r\n    gsap.from(\".btn-daftar\", { ...defaultAnimation, duration: 1 });\r\n\r\n    // Main content animations\r\n    gsap.from(\".hero-text\", defaultAnimation);\r\n    gsap.from(\".hero-illustration\", defaultAnimation);\r\n    gsap.from(\".btn-learnmore\", defaultAnimation);\r\n    gsap.from(\".btn-switch\", defaultAnimation);\r\n\r\n    // Sections animations\r\n    gsap.from(\".section-howitworks\", defaultAnimation);\r\n    gsap.from(\".howitworks-cards\", defaultAnimation);\r\n    gsap.from(\".section-stress\", defaultAnimation);\r\n    gsap.from(\".stress-left\", defaultAnimation);\r\n    gsap.from(\".stress-right\", defaultAnimation);\r\n    gsap.from(\".stress-box\", defaultAnimation);\r\n\r\n    // Symptom items with stagger\r\n    gsap.from(\".symptom-item\", {\r\n        ...defaultAnimation,\r\n        stagger: 0.2\r\n    });\r\n\r\n    // Footer animations\r\n    gsap.from(\".footer-top\", defaultAnimation);\r\n    gsap.from(\".footer-subtext\", defaultAnimation);\r\n    gsap.from(\".footer-bottom\", defaultAnimation);\r\n\r\n    // Navbar hover animations\r\n    const navLinks = document.querySelectorAll('nav a');\r\n    \r\n    navLinks.forEach(link => {\r\n        link.addEventListener('mouseenter', () => {\r\n            gsap.to(link, {\r\n                color: '#FF6B6B', // Sesuaikan dengan warna yang diinginkan\r\n                scale: 1.1,\r\n                duration: 0.3,\r\n                ease: \"power1.out\"\r\n            });\r\n        });\r\n\r\n        link.addEventListener('mouseleave', () => {\r\n            gsap.to(link, {\r\n                color: '#333333', // Kembalikan ke warna default\r\n                scale: 1,\r\n                duration: 0.3,\r\n                ease: \"power1.out\"\r\n            });\r\n        });\r\n    });\r\n};\r\n\r\n\n\n//# sourceURL=webpack://hexamood/./src/js/form/animations.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/style.css */ \"./src/styles/style.css\");\n/* harmony import */ var _form_animations_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form/animations.js */ \"./src/js/form/animations.js\");\n // Import CSS\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  (0,_form_animations_js__WEBPACK_IMPORTED_MODULE_1__.initializeAnimations)();\n});\n\n//# sourceURL=webpack://hexamood/./src/js/main.js?");

/***/ }),

/***/ "./src/styles/style.css":
/*!******************************!*\
  !*** ./src/styles/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://hexamood/./src/styles/style.css?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/main.js");
/******/ 	
/******/ })()
;