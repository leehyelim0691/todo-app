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
        console.log("todo 완료항목 삭제");
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
/* harmony export */   setupInputHandler: () => (/* binding */ setupInputHandler),
/* harmony export */   sortList: () => (/* binding */ sortList)
/* harmony export */ });
/* harmony import */ var _info__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./info */ "./src/components/info.ts");
/* harmony import */ var _utils_dragUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dragUtils */ "./src/utils/dragUtils.ts");
/* harmony import */ var _state_dragState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state/dragState */ "./src/state/dragState.ts");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};



var todoIdCounter = 0;
var DRAG_THRESHOLD = 5;
function renderList() {
    var list = document.createElement("ul");
    list.id = "todo-list";
    return list;
}
function setupInputHandler() {
    var input = document.getElementById("todo-input");
    var list = document.getElementById("todo-list");
    if (!input || !list)
        return;
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            var value = input.value.trim();
            if (!value)
                return;
            createTodoItem(value);
            input.value = "";
        }
    });
}
function createTodoItem(value) {
    var list = document.getElementById("todo-list");
    var li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.id = (todoIdCounter++).toString();
    var span = document.createElement("span");
    span.textContent = value;
    span.className = "todo-text";
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.className = "delete-button";
    li.append(span, deleteButton);
    list.prepend(li);
    li.addEventListener("click", function (e) {
        if (e.target.tagName === "BUTTON" || _state_dragState__WEBPACK_IMPORTED_MODULE_2__.clickSuppressedByDrag) {
            _state_dragState__WEBPACK_IMPORTED_MODULE_2__.clickSuppressedByDrag.value = false;
            return;
        }
        span.classList.toggle("completed");
        sortList();
        (0,_info__WEBPACK_IMPORTED_MODULE_0__.applyCurrentFilter)();
        (0,_info__WEBPACK_IMPORTED_MODULE_0__.updateItemsLeft)();
        (0,_info__WEBPACK_IMPORTED_MODULE_0__.updateClearCompletedButton)();
    });
    li.addEventListener("mousedown", function (e) {
        if (span.classList.contains("completed"))
            return;
        _state_dragState__WEBPACK_IMPORTED_MODULE_2__.isMouseDown.value = true;
        _state_dragState__WEBPACK_IMPORTED_MODULE_2__.draggingEl.value = li;
        _state_dragState__WEBPACK_IMPORTED_MODULE_2__.dragStartX.value = e.clientX;
        _state_dragState__WEBPACK_IMPORTED_MODULE_2__.dragStartY.value = e.clientY;
        document.addEventListener("mousemove", detectDragStart);
        document.addEventListener("mouseup", cancelDetectDragStart);
    });
    deleteButton.addEventListener("click", function () {
        li.remove();
        (0,_info__WEBPACK_IMPORTED_MODULE_0__.updateItemsLeft)();
        (0,_info__WEBPACK_IMPORTED_MODULE_0__.updateClearCompletedButton)();
    });
    (0,_info__WEBPACK_IMPORTED_MODULE_0__.updateItemsLeft)();
    (0,_info__WEBPACK_IMPORTED_MODULE_0__.updateClearCompletedButton)();
}
function sortList() {
    var list = document.getElementById("todo-list");
    var items = Array.from(list.children);
    var activeItems = items
        .filter(function (item) { var _a; return !((_a = item.querySelector(".todo-text")) === null || _a === void 0 ? void 0 : _a.classList.contains("completed")); })
        .sort(function (a, b) { return Number(b.dataset.id) - Number(a.dataset.id); });
    var completedItems = items.filter(function (item) { var _a; return (_a = item.querySelector(".todo-text")) === null || _a === void 0 ? void 0 : _a.classList.contains("completed"); });
    list.innerHTML = "";
    __spreadArray(__spreadArray([], activeItems, true), completedItems, true).forEach(function (item) { return list.appendChild(item); });
}
function detectDragStart(e) {
    if (!_state_dragState__WEBPACK_IMPORTED_MODULE_2__.isMouseDown.value || !_state_dragState__WEBPACK_IMPORTED_MODULE_2__.draggingEl.value)
        return;
    var dx = Math.abs(e.clientX - _state_dragState__WEBPACK_IMPORTED_MODULE_2__.dragStartX.value);
    var dy = Math.abs(e.clientY - _state_dragState__WEBPACK_IMPORTED_MODULE_2__.dragStartY.value);
    if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
        startDrag(e);
        cancelDetectDragStart();
    }
}
function cancelDetectDragStart() {
    _state_dragState__WEBPACK_IMPORTED_MODULE_2__.isMouseDown.value = false;
    document.removeEventListener("mousemove", detectDragStart);
    document.removeEventListener("mouseup", cancelDetectDragStart);
}
function startDrag(e) {
    _state_dragState__WEBPACK_IMPORTED_MODULE_2__.originalNextSibling.value = _state_dragState__WEBPACK_IMPORTED_MODULE_2__.draggingEl.value.nextSibling;
    _state_dragState__WEBPACK_IMPORTED_MODULE_2__.isDragging.value = true;
    _state_dragState__WEBPACK_IMPORTED_MODULE_2__.draggingEl.value.style.opacity = "0.3";
    _state_dragState__WEBPACK_IMPORTED_MODULE_2__.mirrorEl.value = _state_dragState__WEBPACK_IMPORTED_MODULE_2__.draggingEl.value.cloneNode(true);
    _state_dragState__WEBPACK_IMPORTED_MODULE_2__.mirrorEl.value.classList.add("mirror");
    var rect = _state_dragState__WEBPACK_IMPORTED_MODULE_2__.draggingEl.value.getBoundingClientRect();
    _state_dragState__WEBPACK_IMPORTED_MODULE_2__.mirrorEl.value.style.width = "".concat(rect.width, "px");
    _state_dragState__WEBPACK_IMPORTED_MODULE_2__.mirrorEl.value.style.height = "".concat(rect.height, "px");
    document.body.appendChild(_state_dragState__WEBPACK_IMPORTED_MODULE_2__.mirrorEl.value);
    (0,_utils_dragUtils__WEBPACK_IMPORTED_MODULE_1__.updateMirrorPosition)(e.clientX, e.clientY, _state_dragState__WEBPACK_IMPORTED_MODULE_2__.mirrorEl.value);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keydown", handleKeyDown);
}
function handleMouseMove(e) {
    var _a, _b;
    if (!_state_dragState__WEBPACK_IMPORTED_MODULE_2__.isDragging.value || !_state_dragState__WEBPACK_IMPORTED_MODULE_2__.draggingEl.value)
        return;
    (0,_utils_dragUtils__WEBPACK_IMPORTED_MODULE_1__.updateMirrorPosition)(e.clientX, e.clientY, _state_dragState__WEBPACK_IMPORTED_MODULE_2__.mirrorEl.value);
    var list = document.getElementById("todo-list");
    var rect = list.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        (_a = _state_dragState__WEBPACK_IMPORTED_MODULE_2__.targetEl.value) === null || _a === void 0 ? void 0 : _a.style.removeProperty("border-left");
        _state_dragState__WEBPACK_IMPORTED_MODULE_2__.targetEl.value = null;
        (0,_utils_dragUtils__WEBPACK_IMPORTED_MODULE_1__.clearPreviewTimer)(_state_dragState__WEBPACK_IMPORTED_MODULE_2__.previewTimer.value);
        return;
    }
    var afterElement = getDragAfterElement(list, e.clientY);
    if (_state_dragState__WEBPACK_IMPORTED_MODULE_2__.targetEl.value && _state_dragState__WEBPACK_IMPORTED_MODULE_2__.targetEl.value !== afterElement) {
        _state_dragState__WEBPACK_IMPORTED_MODULE_2__.targetEl.value.style.removeProperty("border-left");
        (0,_utils_dragUtils__WEBPACK_IMPORTED_MODULE_1__.clearPreviewTimer)(_state_dragState__WEBPACK_IMPORTED_MODULE_2__.previewTimer.value);
    }
    _state_dragState__WEBPACK_IMPORTED_MODULE_2__.targetEl.value = afterElement;
    if (_state_dragState__WEBPACK_IMPORTED_MODULE_2__.targetEl.value && !((_b = _state_dragState__WEBPACK_IMPORTED_MODULE_2__.targetEl.value.querySelector(".todo-text")) === null || _b === void 0 ? void 0 : _b.classList.contains("completed"))) {
        _state_dragState__WEBPACK_IMPORTED_MODULE_2__.targetEl.value.style.borderLeft = "4px solid limegreen";
        (0,_utils_dragUtils__WEBPACK_IMPORTED_MODULE_1__.clearPreviewTimer)(_state_dragState__WEBPACK_IMPORTED_MODULE_2__.previewTimer.value);
        _state_dragState__WEBPACK_IMPORTED_MODULE_2__.previewTimer.value = window.setTimeout(function () { return movePreview(); }, 2000);
    }
}
function movePreview() {
    if (!_state_dragState__WEBPACK_IMPORTED_MODULE_2__.targetEl.value || !_state_dragState__WEBPACK_IMPORTED_MODULE_2__.draggingEl.value)
        return;
    var list = document.getElementById("todo-list");
    var targetRect = _state_dragState__WEBPACK_IMPORTED_MODULE_2__.targetEl.value.getBoundingClientRect();
    var draggingRect = _state_dragState__WEBPACK_IMPORTED_MODULE_2__.draggingEl.value.getBoundingClientRect();
    var isMovingDown = draggingRect.top < targetRect.top;
    var nextEl = _state_dragState__WEBPACK_IMPORTED_MODULE_2__.targetEl.value.nextSibling;
    _state_dragState__WEBPACK_IMPORTED_MODULE_2__.targetEl.value.style.removeProperty("border-left");
    if (isMovingDown && nextEl !== _state_dragState__WEBPACK_IMPORTED_MODULE_2__.draggingEl.value) {
        list.insertBefore(_state_dragState__WEBPACK_IMPORTED_MODULE_2__.draggingEl.value, nextEl);
    }
    else if (!isMovingDown && _state_dragState__WEBPACK_IMPORTED_MODULE_2__.targetEl.value !== _state_dragState__WEBPACK_IMPORTED_MODULE_2__.draggingEl.value) {
        list.insertBefore(_state_dragState__WEBPACK_IMPORTED_MODULE_2__.draggingEl.value, _state_dragState__WEBPACK_IMPORTED_MODULE_2__.targetEl.value);
    }
    _state_dragState__WEBPACK_IMPORTED_MODULE_2__.targetEl.value = _state_dragState__WEBPACK_IMPORTED_MODULE_2__.draggingEl.value;
    _state_dragState__WEBPACK_IMPORTED_MODULE_2__.targetEl.value.style.borderLeft = "4px solid limegreen";
    _state_dragState__WEBPACK_IMPORTED_MODULE_2__.previewMoved.value = true;
}
function handleMouseUp(e) {
    var _a, _b;
    if (!_state_dragState__WEBPACK_IMPORTED_MODULE_2__.draggingEl.value)
        return;
    var list = document.getElementById("todo-list");
    var rect = list.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        if (_state_dragState__WEBPACK_IMPORTED_MODULE_2__.originalNextSibling.value)
            list.insertBefore(_state_dragState__WEBPACK_IMPORTED_MODULE_2__.draggingEl.value, _state_dragState__WEBPACK_IMPORTED_MODULE_2__.originalNextSibling.value);
        cleanupDrag();
        return;
    }
    if ((_a = _state_dragState__WEBPACK_IMPORTED_MODULE_2__.mirrorEl.value) === null || _a === void 0 ? void 0 : _a.parentNode)
        _state_dragState__WEBPACK_IMPORTED_MODULE_2__.mirrorEl.value.remove();
    (_b = _state_dragState__WEBPACK_IMPORTED_MODULE_2__.targetEl.value) === null || _b === void 0 ? void 0 : _b.style.removeProperty("border-left");
    _state_dragState__WEBPACK_IMPORTED_MODULE_2__.draggingEl.value.style.opacity = "1";
    _state_dragState__WEBPACK_IMPORTED_MODULE_2__.clickSuppressedByDrag.value = true;
    cleanupDrag();
}
function handleKeyDown(e) {
    if (e.key === "Escape") {
        var list = document.getElementById("todo-list");
        if (_state_dragState__WEBPACK_IMPORTED_MODULE_2__.draggingEl.value && _state_dragState__WEBPACK_IMPORTED_MODULE_2__.originalNextSibling.value)
            list.insertBefore(_state_dragState__WEBPACK_IMPORTED_MODULE_2__.draggingEl.value, _state_dragState__WEBPACK_IMPORTED_MODULE_2__.originalNextSibling.value);
        cleanupDrag();
        _state_dragState__WEBPACK_IMPORTED_MODULE_2__.clickSuppressedByDrag.value = true;
    }
}
function getDragAfterElement(container, y) {
    var elements = document.elementsFromPoint(window.innerWidth / 2, y);
    return elements.find(function (el) { return el.classList.contains("todo-item"); });
}
function cleanupDrag() {
    (0,_state_dragState__WEBPACK_IMPORTED_MODULE_2__.resetDragState)();
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("keydown", handleKeyDown);
}


/***/ }),

/***/ "./src/state/dragState.ts":
/*!********************************!*\
  !*** ./src/state/dragState.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clickSuppressedByDrag: () => (/* binding */ clickSuppressedByDrag),
/* harmony export */   dragStartX: () => (/* binding */ dragStartX),
/* harmony export */   dragStartY: () => (/* binding */ dragStartY),
/* harmony export */   draggingEl: () => (/* binding */ draggingEl),
/* harmony export */   isDragging: () => (/* binding */ isDragging),
/* harmony export */   isMouseDown: () => (/* binding */ isMouseDown),
/* harmony export */   mirrorEl: () => (/* binding */ mirrorEl),
/* harmony export */   originalNextSibling: () => (/* binding */ originalNextSibling),
/* harmony export */   previewMoved: () => (/* binding */ previewMoved),
/* harmony export */   previewTimer: () => (/* binding */ previewTimer),
/* harmony export */   resetDragState: () => (/* binding */ resetDragState),
/* harmony export */   targetEl: () => (/* binding */ targetEl)
/* harmony export */ });
var draggingEl = { value: null };
var isDragging = { value: false };
var targetEl = { value: null };
var mirrorEl = { value: null };
var previewTimer = { value: null };
var isMouseDown = { value: false };
var dragStartX = { value: 0 };
var dragStartY = { value: 0 };
var clickSuppressedByDrag = { value: false };
var originalNextSibling = { value: null };
var previewMoved = { value: false };
function resetDragState() {
    draggingEl.value = null;
    isDragging.value = false;
    targetEl.value = null;
    mirrorEl.value = null;
    previewTimer.value = null;
    isMouseDown.value = false;
    dragStartX.value = 0;
    dragStartY.value = 0;
    clickSuppressedByDrag.value = false;
    originalNextSibling.value = null;
    previewMoved.value = false;
}


/***/ }),

/***/ "./src/utils/dragUtils.ts":
/*!********************************!*\
  !*** ./src/utils/dragUtils.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearPreviewTimer: () => (/* binding */ clearPreviewTimer),
/* harmony export */   updateMirrorPosition: () => (/* binding */ updateMirrorPosition)
/* harmony export */ });
function clearPreviewTimer(timer) {
    if (timer !== null) {
        clearTimeout(timer);
    }
    return null;
}
function updateMirrorPosition(x, y, mirrorEl) {
    if (!mirrorEl)
        return;
    mirrorEl.style.left = x + 10 + 'px';
    mirrorEl.style.top = y + 10 + 'px';
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
}
// HTML 이 로드된 다음 init() 실행
document.addEventListener('DOMContentLoaded', init);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map