/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/info.ts":
/*!********************************!*\
  !*** ./src/components/info.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyCurrentFilter: () => (/* binding */ applyCurrentFilter),
/* harmony export */   renderInfo: () => (/* binding */ renderInfo),
/* harmony export */   setupClearCompletedHandler: () => (/* binding */ setupClearCompletedHandler),
/* harmony export */   setupFilterHandlers: () => (/* binding */ setupFilterHandlers),
/* harmony export */   updateClearCompletedButton: () => (/* binding */ updateClearCompletedButton),
/* harmony export */   updateItemsLeft: () => (/* binding */ updateItemsLeft)
/* harmony export */ });
function renderInfo() {
    var container = document.createElement('div');
    container.className = 'info-container';
    // 1. 남은 항목 개수 표시
    var itemsLeft = document.createElement('span');
    itemsLeft.id = 'items-left';
    itemsLeft.textContent = '0 items left';
    // 2. 필터 버튼 그룹
    var filters = document.createElement('div');
    filters.className = 'filters';
    var allButton = document.createElement('button');
    allButton.id = 'filter-all';
    allButton.className = 'filter-button selected';
    allButton.textContent = 'All';
    var activeButton = document.createElement('button');
    activeButton.id = 'filter-active';
    activeButton.className = 'filter-button';
    activeButton.textContent = 'Active';
    var completedButton = document.createElement('button');
    completedButton.id = 'filter-completed';
    completedButton.className = 'filter-button';
    completedButton.textContent = 'Completed';
    filters.appendChild(allButton);
    filters.appendChild(activeButton);
    filters.appendChild(completedButton);
    // 3. 완료된 항목 삭제 버튼
    var clearCompletedButton = document.createElement('button');
    clearCompletedButton.id = 'clear-completed';
    clearCompletedButton.className = 'clear-button';
    clearCompletedButton.textContent = 'Clear Completed (0)';
    container.appendChild(itemsLeft);
    container.appendChild(filters);
    container.appendChild(clearCompletedButton);
    return container;
}
var currentFilter = 'all';
function setupFilterHandlers() {
    var allButton = document.getElementById('filter-all');
    var activeButton = document.getElementById('filter-active');
    var completedButton = document.getElementById('filter-completed');
    var filterButtons = [allButton, activeButton, completedButton];
    function clearSelected() {
        filterButtons.forEach(function (btn) { return btn.classList.remove('selected'); });
    }
    allButton.addEventListener('click', function () {
        clearSelected();
        allButton.classList.add('selected');
        currentFilter = 'all';
        applyCurrentFilter();
        updateItemsLeft();
    });
    activeButton.addEventListener('click', function () {
        clearSelected();
        activeButton.classList.add('selected');
        currentFilter = 'active';
        applyCurrentFilter();
        updateItemsLeft();
    });
    completedButton.addEventListener('click', function () {
        clearSelected();
        completedButton.classList.add('selected');
        currentFilter = 'completed';
        applyCurrentFilter();
        updateItemsLeft();
    });
}
function updateItemsLeft() {
    var list = document.getElementById('todo-list');
    var itemsLeftSpan = document.getElementById('items-left');
    var todos = Array.from(list.children);
    var count = 0;
    if (currentFilter === 'all') {
        count = todos.length;
    }
    else if (currentFilter === 'active') {
        count = todos.filter(function (item) {
            var span = item.querySelector('span');
            return span && !span.classList.contains('completed');
        }).length;
    }
    else if (currentFilter === 'completed') {
        count = todos.filter(function (item) {
            var span = item.querySelector('span');
            return span && span.classList.contains('completed');
        }).length;
    }
    itemsLeftSpan.textContent = "".concat(count, " items left");
}
function applyCurrentFilter() {
    var list = document.getElementById('todo-list');
    var items = Array.from(list.children);
    items.forEach(function (item) {
        var span = item.querySelector('span');
        if (!span)
            return;
        if (currentFilter === 'all') {
            item.style.display = 'flex';
        }
        else if (currentFilter === 'active') {
            item.style.display = span.classList.contains('completed') ? 'none' : 'flex';
        }
        else if (currentFilter === 'completed') {
            item.style.display = span.classList.contains('completed') ? 'flex' : 'none';
        }
    });
}
function updateClearCompletedButton() {
    var list = document.getElementById('todo-list');
    var clearButton = document.getElementById('clear-completed');
    var completedCount = Array.from(list.children).filter(function (item) {
        var span = item.querySelector('span');
        return span && span.classList.contains('completed');
    }).length;
    console.log("...uypdate : ", completedCount);
    clearButton.textContent = "Clear Completed (".concat(completedCount, ")");
}
function setupClearCompletedHandler() {
    var list = document.getElementById('todo-list');
    var clearButton = document.getElementById('clear-completed');
    clearButton.addEventListener('click', function () {
        Array.from(list.children).forEach(function (item) {
            var span = item.querySelector('span');
            if (span && span.classList.contains('completed')) {
                list.removeChild(item);
            }
        });
        applyCurrentFilter();
        updateItemsLeft();
        updateClearCompletedButton();
    });
}


/***/ }),

/***/ "./src/components/input.ts":
/*!*********************************!*\
  !*** ./src/components/input.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderInput: () => (/* binding */ renderInput)
/* harmony export */ });
function renderInput() {
    var container = document.createElement('div');
    var input = document.createElement('input');
    input.id = 'todo-input';
    input.type = 'text';
    input.placeholder = 'What needs to be done?';
    container.appendChild(input);
    return container;
}


/***/ }),

/***/ "./src/components/list.ts":
/*!********************************!*\
  !*** ./src/components/list.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderList: () => (/* binding */ renderList),
/* harmony export */   setupDragAndDrop: () => (/* binding */ setupDragAndDrop),
/* harmony export */   setupInputHandler: () => (/* binding */ setupInputHandler),
/* harmony export */   sortList: () => (/* binding */ sortList)
/* harmony export */ });
/* harmony import */ var _info__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./info */ "./src/components/info.ts");

var todoIdCounter = 0;
function renderList() {
    var list = document.createElement('ul');
    list.id = 'todo-list';
    return list;
}
function setupInputHandler() {
    var input = document.getElementById('todo-input');
    var list = document.getElementById('todo-list');
    if (input && list) {
        input.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                var value = input.value.trim();
                if (value !== '') {
                    var li_1 = document.createElement('li');
                    li_1.className = 'todo-item';
                    li_1.dataset.id = (todoIdCounter++).toString(); // 등록 순서 저장
                    var span_1 = document.createElement('span');
                    span_1.textContent = value;
                    span_1.className = 'todo-text';
                    var deleteButton = document.createElement('button');
                    deleteButton.textContent = '삭제';
                    deleteButton.className = 'delete-button';
                    li_1.addEventListener('click', function (e) {
                        if (e.target.tagName === 'BUTTON') {
                            return;
                        }
                        span_1.classList.toggle('completed');
                        var isCompleted = span_1.classList.contains('completed');
                        if (isCompleted) {
                            console.log("todo 완료 토글");
                        }
                        else {
                            console.log("todo 미완료 토글");
                        }
                        sortList();
                        (0,_info__WEBPACK_IMPORTED_MODULE_0__.applyCurrentFilter)();
                        (0,_info__WEBPACK_IMPORTED_MODULE_0__.updateItemsLeft)();
                        (0,_info__WEBPACK_IMPORTED_MODULE_0__.updateClearCompletedButton)();
                    });
                    deleteButton.addEventListener('click', function () {
                        li_1.remove();
                        console.log("todo 삭제");
                        (0,_info__WEBPACK_IMPORTED_MODULE_0__.updateItemsLeft)();
                        (0,_info__WEBPACK_IMPORTED_MODULE_0__.updateClearCompletedButton)();
                    });
                    li_1.appendChild(span_1);
                    li_1.appendChild(deleteButton);
                    list.prepend(li_1);
                    input.value = '';
                    console.log("todo 등록");
                    (0,_info__WEBPACK_IMPORTED_MODULE_0__.updateItemsLeft)();
                    (0,_info__WEBPACK_IMPORTED_MODULE_0__.updateClearCompletedButton)();
                }
            }
        });
    }
}
function sortList() {
    var list = document.getElementById('todo-list');
    var items = Array.from(list.children);
    var activeItems = items
        .filter(function (item) {
        var span = item.querySelector('span');
        return span && !span.classList.contains('completed');
    })
        .sort(function (a, b) {
        var idA = Number(a.dataset.id);
        var idB = Number(b.dataset.id);
        return idB - idA; // id 기준 내림차순
    });
    var completedItems = items.filter(function (item) {
        var span = item.querySelector('span');
        return span && span.classList.contains('completed');
    });
    list.innerHTML = '';
    activeItems.forEach(function (item) { return list.appendChild(item); });
    completedItems.forEach(function (item) { return list.appendChild(item); });
}
var draggingItem = null;
var guideLine = null;
var isDragging = false;
function setupDragAndDrop() {
    var list = document.getElementById('todo-list');
    list.addEventListener('mousedown', function (e) {
        var target = e.target;
        // 버튼 눌렀을 때는 드래그 시작하면 안 됨
        if (target.tagName === 'BUTTON')
            return;
        // 정확히 li 요소 찾아
        var li = target.closest('li');
        if (!li)
            return;
        // 완료된 아이템이면 드래그 금지
        var span = li.querySelector('span');
        if (span === null || span === void 0 ? void 0 : span.classList.contains('completed')) {
            return;
        }
        draggingItem = li;
        isDragging = true;
        guideLine = document.createElement('div');
        guideLine.style.position = 'absolute';
        guideLine.style.width = '4px';
        guideLine.style.height = "".concat(draggingItem.offsetHeight, "px");
        guideLine.style.backgroundColor = 'limegreen';
        guideLine.style.zIndex = '1000';
        guideLine.style.left = '0'; // li 왼쪽
        guideLine.style.pointerEvents = 'none'; // 드래그 막지 않게
        var listRect = list.getBoundingClientRect();
        var itemRect = li.getBoundingClientRect();
        guideLine.style.top = "".concat(itemRect.top - listRect.top + list.scrollTop, "px");
        list.appendChild(guideLine);
        // ✅ 여기서 등록해야 드래그 움직임/드랍 처리 가능
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}
function onMouseMove(e) {
    if (!isDragging || !draggingItem || !guideLine)
        return;
    var list = document.getElementById('todo-list');
    var items = Array.from(list.children);
    var targetItem = null;
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        var rect = item.getBoundingClientRect();
        if (e.clientY > rect.top && e.clientY < rect.bottom) {
            targetItem = item;
            break;
        }
    }
    if (targetItem) {
        var rect = targetItem.getBoundingClientRect();
        var listRect = list.getBoundingClientRect();
        guideLine.style.top = "".concat(rect.top - listRect.top + list.scrollTop, "px");
    }
}
function onMouseUp(e) {
    if (!isDragging || !draggingItem || !guideLine)
        return;
    var list = document.getElementById('todo-list');
    var items = Array.from(list.children);
    var insertBeforeItem = null;
    for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
        var item = items_2[_i];
        var rect = item.getBoundingClientRect();
        if (e.clientY > rect.top && e.clientY < rect.bottom) {
            insertBeforeItem = item;
            break;
        }
    }
    if (insertBeforeItem && insertBeforeItem !== draggingItem) {
        var span = insertBeforeItem.querySelector('span');
        if (span && !span.classList.contains('completed')) {
            list.insertBefore(draggingItem, insertBeforeItem);
        }
    }
    isDragging = false;
    draggingItem = null;
    guideLine === null || guideLine === void 0 ? void 0 : guideLine.remove();
    guideLine = null;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}


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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/input */ "./src/components/input.ts");
/* harmony import */ var _components_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/list */ "./src/components/list.ts");
/* harmony import */ var _components_info__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/info */ "./src/components/info.ts");



function init() {
    var app = document.getElementById('app');
    if (!app) {
        console.error('App root element not found!');
        return;
    }
    var container = document.createElement('div');
    container.className = 'todo-container';
    var inputSection = (0,_components_input__WEBPACK_IMPORTED_MODULE_0__.renderInput)(); // 입력부
    var listSection = (0,_components_list__WEBPACK_IMPORTED_MODULE_1__.renderList)(); // 목록 출력부
    var infoSection = (0,_components_info__WEBPACK_IMPORTED_MODULE_2__.renderInfo)(); // 정보 출력부
    container.appendChild(inputSection);
    container.appendChild(listSection);
    container.appendChild(infoSection);
    app.appendChild(container);
    (0,_components_list__WEBPACK_IMPORTED_MODULE_1__.setupInputHandler)();
    (0,_components_info__WEBPACK_IMPORTED_MODULE_2__.setupFilterHandlers)();
    (0,_components_info__WEBPACK_IMPORTED_MODULE_2__.setupClearCompletedHandler)();
    (0,_components_list__WEBPACK_IMPORTED_MODULE_1__.setupDragAndDrop)();
}
// HTML 이 로드된 다음 init() 실행
document.addEventListener('DOMContentLoaded', init);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map