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
    const container = document.createElement('div');
    container.className = 'info-container';
    // 1. 남은 항목 개수 표시
    const itemsLeft = document.createElement('span');
    itemsLeft.id = 'items-left';
    itemsLeft.textContent = '0 items left';
    // 2. 필터 버튼 그룹
    const filters = document.createElement('div');
    filters.className = 'filters';
    const allButton = document.createElement('button');
    allButton.id = 'filter-all';
    allButton.className = 'filter-button selected';
    allButton.textContent = 'All';
    const activeButton = document.createElement('button');
    activeButton.id = 'filter-active';
    activeButton.className = 'filter-button';
    activeButton.textContent = 'Active';
    const completedButton = document.createElement('button');
    completedButton.id = 'filter-completed';
    completedButton.className = 'filter-button';
    completedButton.textContent = 'Completed';
    filters.appendChild(allButton);
    filters.appendChild(activeButton);
    filters.appendChild(completedButton);
    // 3. 완료된 항목 삭제 버튼
    const clearCompletedButton = document.createElement('button');
    clearCompletedButton.id = 'clear-completed';
    clearCompletedButton.className = 'clear-button';
    clearCompletedButton.textContent = 'Clear Completed (0)';
    container.appendChild(itemsLeft);
    container.appendChild(filters);
    container.appendChild(clearCompletedButton);
    return container;
}
let currentFilter = 'all';
function setupFilterHandlers() {
    const allButton = document.getElementById('filter-all');
    const activeButton = document.getElementById('filter-active');
    const completedButton = document.getElementById('filter-completed');
    const filterButtons = [allButton, activeButton, completedButton];
    function clearSelected() {
        filterButtons.forEach(btn => btn.classList.remove('selected'));
    }
    allButton.addEventListener('click', () => {
        clearSelected();
        allButton.classList.add('selected');
        currentFilter = 'all';
        applyCurrentFilter();
        updateItemsLeft();
    });
    activeButton.addEventListener('click', () => {
        clearSelected();
        activeButton.classList.add('selected');
        currentFilter = 'active';
        applyCurrentFilter();
        updateItemsLeft();
    });
    completedButton.addEventListener('click', () => {
        clearSelected();
        completedButton.classList.add('selected');
        currentFilter = 'completed';
        applyCurrentFilter();
        updateItemsLeft();
    });
}
function updateItemsLeft() {
    const list = document.getElementById('todo-list');
    const itemsLeftSpan = document.getElementById('items-left');
    const todos = Array.from(list.children);
    let count = 0;
    if (currentFilter === 'all') {
        count = todos.length;
    }
    else if (currentFilter === 'active') {
        count = todos.filter(item => {
            const span = item.querySelector('span');
            return span && !span.classList.contains('completed');
        }).length;
    }
    else if (currentFilter === 'completed') {
        count = todos.filter(item => {
            const span = item.querySelector('span');
            return span && span.classList.contains('completed');
        }).length;
    }
    itemsLeftSpan.textContent = `${count} items left`;
}
function applyCurrentFilter() {
    const list = document.getElementById('todo-list');
    const items = Array.from(list.children);
    items.forEach(item => {
        const span = item.querySelector('span');
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
    const list = document.getElementById('todo-list');
    const clearButton = document.getElementById('clear-completed');
    const completedCount = Array.from(list.children).filter(item => {
        const span = item.querySelector('span');
        return span && span.classList.contains('completed');
    }).length;
    clearButton.textContent = `Clear Completed (${completedCount})`;
}
function setupClearCompletedHandler() {
    const list = document.getElementById('todo-list');
    const clearButton = document.getElementById('clear-completed');
    clearButton.addEventListener('click', () => {
        Array.from(list.children).forEach(item => {
            const span = item.querySelector('span');
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
    const container = document.createElement('div');
    const input = document.createElement('input');
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


let todoIdCounter = 0;
let draggingEl = null;
let isDragging = false;
let targetEl = null;
let mirrorEl = null;
let previewTimer = null;
let isMouseDown = false;
let dragStartX = 0;
let dragStartY = 0;
const DRAG_THRESHOLD = 5;
let clickSuppressedByDrag = false;
let originalIndex = null;
let previewMoved = false;
let originalNextSibling = null;
function renderList() {
    const list = document.createElement('ul');
    list.id = 'todo-list';
    return list;
}
function setupInputHandler() {
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
    if (input && list) {
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const value = input.value.trim();
                if (!value)
                    return;
                createTodoItem(value);
                input.value = '';
            }
        });
    }
}
function createTodoItem(value) {
    const list = document.getElementById("todo-list");
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = (todoIdCounter++).toString(); // 등록 순서 저장
    const span = document.createElement('span');
    span.textContent = value;
    span.className = 'todo-text';
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.className = 'delete-button';
    li.append(span, deleteButton);
    list.prepend(li);
    li.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON')
            return;
        // 드래그 후 발생한 클릭이면 막기
        if (clickSuppressedByDrag) {
            clickSuppressedByDrag = false; // 다음 클릭부터는 정상 처리
            return;
        }
        span.classList.toggle('completed');
        const isCompleted = span.classList.contains('completed');
        if (isCompleted)
            console.log("todo 완료 토글");
        else
            console.log("todo 미완료 토글");
        sortList();
        (0,_info__WEBPACK_IMPORTED_MODULE_0__.applyCurrentFilter)();
        (0,_info__WEBPACK_IMPORTED_MODULE_0__.updateItemsLeft)();
        (0,_info__WEBPACK_IMPORTED_MODULE_0__.updateClearCompletedButton)();
    });
    li.addEventListener('mousedown', (e) => {
        const span = li.querySelector('.todo-text');
        if (span === null || span === void 0 ? void 0 : span.classList.contains('completed'))
            return;
        isMouseDown = true;
        draggingEl = li;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        document.addEventListener('mousemove', detectDragStart);
        document.addEventListener('mouseup', cancelDetectDragStart);
    });
    deleteButton.addEventListener('click', () => {
        li.remove();
        console.log("todo 삭제");
        (0,_info__WEBPACK_IMPORTED_MODULE_0__.updateItemsLeft)();
        (0,_info__WEBPACK_IMPORTED_MODULE_0__.updateClearCompletedButton)();
    });
    console.log("todo 등록");
    (0,_info__WEBPACK_IMPORTED_MODULE_0__.updateItemsLeft)();
    (0,_info__WEBPACK_IMPORTED_MODULE_0__.updateClearCompletedButton)();
}
function sortList() {
    const list = document.getElementById('todo-list');
    const items = Array.from(list.children);
    const activeItems = items
        .filter(item => { var _a; return !((_a = item.querySelector('.todo-text')) === null || _a === void 0 ? void 0 : _a.classList.contains('completed')); })
        .sort((a, b) => Number(b.dataset.id) - Number(a.dataset.id));
    const completedItems = items.filter(item => {
        const span = item.querySelector('span');
        return span && span.classList.contains('completed');
    });
    list.innerHTML = '';
    [...activeItems, ...completedItems].forEach((item) => list.appendChild(item));
}
function detectDragStart(e) {
    if (!isMouseDown || !draggingEl)
        return;
    const dx = Math.abs(e.clientX - dragStartX);
    const dy = Math.abs(e.clientY - dragStartY);
    if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
        startDrag(e, draggingEl);
        cancelDetectDragStart();
    }
}
function cancelDetectDragStart() {
    isMouseDown = false;
    document.removeEventListener('mousemove', detectDragStart);
    document.removeEventListener('mouseup', cancelDetectDragStart);
}
function startDrag(e, el) {
    if (e.target.tagName === 'BUTTON')
        return;
    const list = document.getElementById("todo-list");
    originalIndex = Array.from(list.children).indexOf(el);
    originalNextSibling = el.nextSibling;
    const span = el.querySelector('.todo-text');
    if (span === null || span === void 0 ? void 0 : span.classList.contains('completed')) {
        return; // 완료된 항목이면 드래그 시작 안함
    }
    draggingEl = el;
    isDragging = true;
    el.style.opacity = '0.3';
    const rect = el.getBoundingClientRect();
    mirrorEl = el.cloneNode(true);
    mirrorEl.classList.add('mirror');
    mirrorEl.style.width = rect.width + 'px';
    mirrorEl.style.height = rect.height + 'px';
    document.body.appendChild(mirrorEl);
    (0,_utils_dragUtils__WEBPACK_IMPORTED_MODULE_1__.updateMirrorPosition)(e.clientX, e.clientY, mirrorEl); // 시작 위치 잡기
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keydown', handleKeyDown);
}
function cancelDrag(fullCancel = false) {
    if (!isDragging || !draggingEl)
        return;
    if (targetEl) {
        targetEl.style.borderLeft = '';
    }
    // mirror 는 진짜 드래그를 "완전히" 취소할 때만 없애기
    if (fullCancel && mirrorEl && mirrorEl.parentNode) {
        mirrorEl.parentNode.removeChild(mirrorEl);
        mirrorEl = null;
    }
    if (fullCancel) {
        draggingEl.style.opacity = '1';
        (0,_utils_dragUtils__WEBPACK_IMPORTED_MODULE_1__.clearPreviewTimer)(previewTimer);
        cleanupDrag();
    }
    originalIndex = null;
    originalNextSibling = null;
    previewMoved = false;
}
function handleMouseMove(e) {
    if (!isDragging || !draggingEl)
        return;
    if (mirrorEl) {
        (0,_utils_dragUtils__WEBPACK_IMPORTED_MODULE_1__.updateMirrorPosition)(e.clientX, e.clientY, mirrorEl);
    }
    const list = document.getElementById('todo-list');
    const listRect = list.getBoundingClientRect(); // 리스트 위치 정보 가져오기
    // 리스트 영역 벗어났는지 체크
    if ((0,_utils_dragUtils__WEBPACK_IMPORTED_MODULE_1__.isOutsideListArea)(e.clientX, e.clientY, list)) {
        if (targetEl) {
            targetEl.style.removeProperty("border-left");
            targetEl = null;
        }
        (0,_utils_dragUtils__WEBPACK_IMPORTED_MODULE_1__.clearPreviewTimer)(previewTimer);
        return;
    }
    const afterElement = getDragAfterElement(list, e.clientY);
    // target이 바뀌었을 때만 처리
    if (targetEl && targetEl !== afterElement) {
        targetEl.style.removeProperty("border-left");
        (0,_utils_dragUtils__WEBPACK_IMPORTED_MODULE_1__.clearPreviewTimer)(previewTimer); // 타이머 초기화
    }
    targetEl = afterElement;
    // 미완료된 항목만 target 으로 선택
    if (targetEl) {
        targetEl.style.borderLeft = ''; // 이전에 있던 강조 제거
        const span = targetEl.querySelector('.todo-text');
        if (span === null || span === void 0 ? void 0 : span.classList.contains('completed')) {
            targetEl = null;
            return;
        }
        targetEl.style.borderLeft = '4px solid limegreen';
        // 타이머 매번 초기화하고 새로 설정
        (0,_utils_dragUtils__WEBPACK_IMPORTED_MODULE_1__.clearPreviewTimer)(previewTimer);
        previewTimer = window.setTimeout(() => {
            if (!targetEl || !draggingEl)
                return;
            movePreview();
            previewMoved = true;
            targetEl = draggingEl;
            targetEl.style.borderLeft = '4px solid limegreen';
        }, 2000);
    }
}
function handleMouseUp(e) {
    if (!isDragging || !draggingEl) {
        if (draggingEl) {
            const list = document.getElementById("todo-list");
            list.insertBefore(draggingEl, originalNextSibling); // nextSibling이 null이면 자동으로 맨 끝으로
        }
        console.log("todo 드래그앤드롭 취소");
        return;
    }
    const list = document.getElementById('todo-list');
    //  드롭이 리스트 영역 밖이면 취소 처리
    if ((0,_utils_dragUtils__WEBPACK_IMPORTED_MODULE_1__.isOutsideListArea)(e.clientX, e.clientY, list)) {
        // 직접 draggingEl 원래 자리로 복구
        if (draggingEl) {
            const list = document.getElementById("todo-list");
            list.insertBefore(draggingEl, originalNextSibling); // nextSibling이 null이면 자동으로 맨 끝으로
        }
        cancelDrag(true);
        console.log("todo 드래그앤드롭 취소");
        return;
    }
    // 정상 드롭 처리
    if (mirrorEl && mirrorEl.parentNode) {
        mirrorEl.parentNode.removeChild(mirrorEl);
        mirrorEl = null;
    }
    if (targetEl) {
        movePreview();
        console.log("todo 드래그앤드롭");
    }
    clickSuppressedByDrag = true;
    draggingEl.style.opacity = '1';
    cleanupDrag();
    (0,_utils_dragUtils__WEBPACK_IMPORTED_MODULE_1__.clearPreviewTimer)(previewTimer);
}
function movePreview() {
    const list = document.getElementById('todo-list');
    const targetRect = targetEl === null || targetEl === void 0 ? void 0 : targetEl.getBoundingClientRect();
    const draggingRect = draggingEl === null || draggingEl === void 0 ? void 0 : draggingEl.getBoundingClientRect();
    const isMovingDown = (draggingRect === null || draggingRect === void 0 ? void 0 : draggingRect.top) < (targetRect === null || targetRect === void 0 ? void 0 : targetRect.top);
    const nextEl = targetEl === null || targetEl === void 0 ? void 0 : targetEl.nextSibling;
    if (isMovingDown && nextEl !== draggingEl) {
        list.insertBefore(draggingEl, nextEl);
    }
    else if (!isMovingDown && targetEl !== draggingEl) {
        list.insertBefore(draggingEl, targetEl);
    }
    targetEl === null || targetEl === void 0 ? void 0 : targetEl.style.removeProperty("border-left");
}
function getDragAfterElement(container, y) {
    const elements = document.elementsFromPoint(window.innerWidth / 2, y);
    for (const el of elements) {
        if (el.classList.contains('todo-item')) {
            return el;
        }
    }
    return null;
}
function handleKeyDown(e) {
    if (e.key === 'Escape' && isDragging) {
        if (draggingEl) {
            const list = document.getElementById("todo-list");
            list.insertBefore(draggingEl, originalNextSibling); // nextSibling이 null이면 자동으로 맨 끝으로
        }
        cancelDrag(true);
        clickSuppressedByDrag = true;
        console.log("todo 드래그앤드롭 취소");
    }
}
function cleanupDrag() {
    isDragging = false;
    draggingEl = null;
    targetEl = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('keydown', handleKeyDown);
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
/* harmony export */   isOutsideListArea: () => (/* binding */ isOutsideListArea),
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
function isOutsideListArea(clientX, clientY, listEl) {
    const rect = listEl.getBoundingClientRect();
    return (clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom);
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
    const app = document.getElementById('app');
    if (!app) {
        console.error('App root element not found!');
        return;
    }
    const container = document.createElement('div');
    container.className = 'todo-container';
    const inputSection = (0,_components_input__WEBPACK_IMPORTED_MODULE_0__.renderInput)(); // 입력부
    const listSection = (0,_components_list__WEBPACK_IMPORTED_MODULE_1__.renderList)(); // 목록 출력부
    const infoSection = (0,_components_info__WEBPACK_IMPORTED_MODULE_2__.renderInfo)(); // 정보 출력부
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