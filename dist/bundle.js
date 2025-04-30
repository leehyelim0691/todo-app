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

var todoIdCounter = 0;
var draggingEl = null;
var isDragging = false;
var targetEl = null;
var mirrorEl = null;
var previewTimer = null;
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
                    li_1.addEventListener('mousedown', function (e) { return startDrag(e, li_1); });
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
function startDrag(e, el) {
    if (e.target.tagName === 'BUTTON')
        return;
    var span = el.querySelector('.todo-text');
    if (span === null || span === void 0 ? void 0 : span.classList.contains('completed')) {
        return; // 완료된 항목이면 드래그 시작 안함
    }
    draggingEl = el;
    isDragging = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keydown', handleKeyDown);
    el.style.opacity = '0.3';
    mirrorEl = el.cloneNode(true);
    mirrorEl.classList.add('mirror');
    var rect = el.getBoundingClientRect();
    mirrorEl.style.width = rect.width + 'px';
    mirrorEl.style.height = rect.height + 'px';
    document.body.appendChild(mirrorEl);
    updateMirrorPosition(e.clientX, e.clientY); // 시작 위치 잡기
}
function cancelDrag(fullCancel) {
    if (fullCancel === void 0) { fullCancel = false; }
    if (!isDragging || !draggingEl)
        return;
    if (targetEl) {
        targetEl.style.borderLeft = '';
    }
    // mirror는 진짜 드래그를 "완전히" 취소할 때만 없애기
    if (fullCancel && mirrorEl && mirrorEl.parentNode) {
        mirrorEl.parentNode.removeChild(mirrorEl);
        mirrorEl = null;
    }
    if (fullCancel) {
        draggingEl.style.opacity = '1';
        isDragging = false;
        draggingEl = null;
        targetEl = null;
        clearPreviewTimer();
        if (fullCancel) {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('keydown', handleKeyDown);
        }
    }
}
function handleMouseMove(e) {
    if (!isDragging || !draggingEl)
        return;
    if (mirrorEl) {
        updateMirrorPosition(e.clientX, e.clientY);
    }
    var list = document.getElementById('todo-list');
    var listRect = list.getBoundingClientRect(); // 리스트 위치 정보 가져오기
    // 리스트 영역 벗어났는지 체크
    if (e.clientX < listRect.left ||
        e.clientX > listRect.right ||
        e.clientY < listRect.top ||
        e.clientY > listRect.bottom) {
        cancelDrag(false);
        return;
    }
    var afterElement = getDragAfterElement(list, e.clientY);
    // target 바뀌면
    if (targetEl && targetEl !== afterElement) {
        targetEl.style.borderLeft = '';
        clearPreviewTimer(); // 타이머 초기화
    }
    targetEl = afterElement;
    // 미완료된 항목만 target 으로 선택
    if (targetEl) {
        targetEl.style.borderLeft = ''; // 이전에 있던 강조 제거
        var span = targetEl.querySelector('.todo-text');
        if (span === null || span === void 0 ? void 0 : span.classList.contains('completed')) {
            targetEl = null;
            return;
        }
        targetEl.style.borderLeft = '4px solid limegreen';
        // 프리뷰용 타이머 설정
        clearPreviewTimer();
        previewTimer = window.setTimeout(function () {
            if (targetEl && draggingEl) {
                // 이동하기 전에 현재 targetEl의 border를 지우기
                targetEl.style.borderLeft = '';
                var list_1 = document.getElementById('todo-list');
                if (targetEl.nextSibling) {
                    list_1.insertBefore(draggingEl, targetEl.nextSibling);
                }
                else {
                    list_1.appendChild(draggingEl);
                }
                // targetEl을 draggingEl로 새로 잡기
                targetEl = draggingEl;
                // draggingEl(=새로운 targetEl)에는 다시 초록색 선
                targetEl.style.borderLeft = '4px solid limegreen';
            }
        }, 2000);
    }
}
function handleMouseUp() {
    if (!isDragging || !draggingEl) {
        console.log("todo 드래그앤드롭 취소");
        return;
    }
    if (mirrorEl && mirrorEl.parentNode) {
        mirrorEl.parentNode.removeChild(mirrorEl);
        mirrorEl = null;
    }
    if (targetEl) {
        var list = document.getElementById('todo-list');
        if (targetEl.nextSibling) {
            list.insertBefore(draggingEl, targetEl.nextSibling);
        }
        else {
            list.appendChild(draggingEl);
        }
        targetEl.style.borderLeft = '';
        console.log("todo 드래그앤드롭");
    }
    draggingEl.style.opacity = '1';
    isDragging = false;
    draggingEl = null;
    targetEl = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('keydown', handleKeyDown);
    clearPreviewTimer();
}
function getDragAfterElement(container, y) {
    var elements = document.elementsFromPoint(window.innerWidth / 2, y);
    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
        var el = elements_1[_i];
        if (el.classList.contains('todo-item')) {
            return el;
        }
    }
    return null;
}
function handleKeyDown(e) {
    if (e.key === 'Escape' && isDragging) {
        cancelDrag(true);
        console.log("todo 드래그앤드롭 취소");
    }
}
function updateMirrorPosition(x, y) {
    if (!mirrorEl)
        return;
    mirrorEl.style.left = x + 10 + 'px';
    mirrorEl.style.top = y + 10 + 'px';
}
function clearPreviewTimer() {
    if (previewTimer !== null) {
        clearTimeout(previewTimer);
        previewTimer = null;
    }
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