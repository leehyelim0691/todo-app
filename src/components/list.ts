import { applyCurrentFilter, updateClearCompletedButton, updateItemsLeft } from "./info";
import {clearPreviewTimer, isOutsideListArea, updateMirrorPosition} from "../utils/dragUtils";

let todoIdCounter = 0;
let draggingEl: HTMLElement | null = null;
let isDragging = false;
let targetEl: HTMLElement | null = null;
let mirrorEl: HTMLElement | null = null;
let previewTimer: number | null = null;
let isMouseDown = false;
let dragStartX = 0;
let dragStartY = 0;
const DRAG_THRESHOLD = 5;
let clickSuppressedByDrag = false;
let originalIndex: number | null = null;
let previewMoved = false;
let originalNextSibling: ChildNode | null = null;


export function renderList(): HTMLElement {
	const list = document.createElement('ul');
	list.id = 'todo-list';
	return list;
}

export function setupInputHandler() {
	const input = document.getElementById('todo-input') as HTMLInputElement;
	const list = document.getElementById('todo-list') as HTMLUListElement;

	if (input && list) {
		input.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				const value = input.value.trim();
				if (!value) return;
				createTodoItem(value);
				input.value = '';
			}
		});
	}
}

function createTodoItem(value: string) {
	const list = document.getElementById("todo-list") as HTMLUListElement;
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

	li.addEventListener('click', (e: MouseEvent): void => {
		if ((e.target as HTMLElement).tagName === 'BUTTON') return;

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
		applyCurrentFilter();
		updateItemsLeft();
		updateClearCompletedButton();
	});

	li.addEventListener('mousedown', (e) => {
		const span = li.querySelector('.todo-text');
		if (span?.classList.contains('completed')) return;

		isMouseDown = true;
		draggingEl = li;
		dragStartX = e.clientX;
		dragStartY = e.clientY;

		document.addEventListener('mousemove', detectDragStart);
		document.addEventListener('mouseup', cancelDetectDragStart);
	});

	deleteButton.addEventListener('click', () => {
		li.remove();
		console.log("todo 삭제")
		updateItemsLeft();
		updateClearCompletedButton();
	});

	console.log("todo 등록")

	updateItemsLeft();
	updateClearCompletedButton();
}

export function sortList(): void {
	const list = document.getElementById('todo-list') as HTMLUListElement;
	const items = Array.from(list.children) as HTMLElement[];

	const activeItems = items
		.filter(item => !item.querySelector('.todo-text')?.classList.contains('completed'))
		.sort((a, b) => Number(b.dataset.id) - Number(a.dataset.id));

	const completedItems = items.filter(item => {
		const span = item.querySelector('span');
		return span && span.classList.contains('completed');
	});

	list.innerHTML = '';

	[...activeItems, ...completedItems].forEach((item) => list.appendChild(item));
}


function detectDragStart(e: MouseEvent) {
	if (!isMouseDown || !draggingEl) return;
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


function startDrag(e: MouseEvent, el: HTMLElement) {
	if ((e.target as HTMLElement).tagName === 'BUTTON') return;

	const list = document.getElementById("todo-list")!;

	originalIndex = Array.from(list.children).indexOf(el);
	originalNextSibling = el.nextSibling;

	const span = el.querySelector('.todo-text');
	if (span?.classList.contains('completed')) {
		return; // 완료된 항목이면 드래그 시작 안함
	}

	draggingEl = el;
	isDragging = true;

	el.style.opacity = '0.3';

	const rect = el.getBoundingClientRect();

	mirrorEl = el.cloneNode(true) as HTMLElement;
	mirrorEl.classList.add('mirror');
	mirrorEl.style.width = rect.width + 'px';
	mirrorEl.style.height = rect.height + 'px';

	document.body.appendChild(mirrorEl);

	updateMirrorPosition(e.clientX, e.clientY, mirrorEl); // 시작 위치 잡기

	document.addEventListener('mousemove', handleMouseMove);
	document.addEventListener('mouseup', handleMouseUp);
	document.addEventListener('keydown', handleKeyDown);
}

function cancelDrag(fullCancel = false) {
	if (!isDragging || !draggingEl) return;

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
		clearPreviewTimer(previewTimer);
		cleanupDrag()
	}

	originalIndex = null;
	originalNextSibling = null;
	previewMoved = false;
}

function handleMouseMove(e: MouseEvent) {
	if (!isDragging || !draggingEl) return;

	if (mirrorEl) {
		updateMirrorPosition(e.clientX, e.clientY, mirrorEl);
	}

	const list = document.getElementById('todo-list') as HTMLElement;
	const listRect = list.getBoundingClientRect(); // 리스트 위치 정보 가져오기

	// 리스트 영역 벗어났는지 체크
	if (isOutsideListArea(e.clientX, e.clientY, list)) {
		if (targetEl) {
			targetEl.style.removeProperty("border-left")
			targetEl = null;
		}
		clearPreviewTimer(previewTimer);
		return;
	}

	const afterElement = getDragAfterElement(list, e.clientY);

	// target이 바뀌었을 때만 처리
	if (targetEl && targetEl !== afterElement) {
		targetEl.style.removeProperty("border-left");
		clearPreviewTimer(previewTimer); // 타이머 초기화
	}

	targetEl = afterElement;

	// 미완료된 항목만 target 으로 선택
	if (targetEl) {
		targetEl.style.borderLeft = '';	// 이전에 있던 강조 제거

		const span = targetEl.querySelector('.todo-text');
		if (span?.classList.contains('completed')) {
			targetEl = null;
			return;
		}

		targetEl.style.borderLeft = '4px solid limegreen';

		// 타이머 매번 초기화하고 새로 설정
		clearPreviewTimer(previewTimer);
		previewTimer = window.setTimeout(() => {
			if (!targetEl || !draggingEl) return;

			movePreview()

			previewMoved = true;
			targetEl = draggingEl;
			targetEl.style.borderLeft = '4px solid limegreen';
		}, 2000);
	}
}


function handleMouseUp(e : MouseEvent) {
	if (!isDragging || !draggingEl) {
		if (draggingEl) {
			const list = document.getElementById("todo-list")!;
			list.insertBefore(draggingEl, originalNextSibling!); // nextSibling이 null이면 자동으로 맨 끝으로
		}
		console.log("todo 드래그앤드롭 취소");
		return;
	}

	const list = document.getElementById('todo-list') as HTMLElement;

	//  드롭이 리스트 영역 밖이면 취소 처리
	if (isOutsideListArea(e.clientX, e.clientY, list))  {
		// 직접 draggingEl 원래 자리로 복구
		if (draggingEl) {
			const list = document.getElementById("todo-list")!;
			list.insertBefore(draggingEl, originalNextSibling!); // nextSibling이 null이면 자동으로 맨 끝으로
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
		movePreview()
		console.log("todo 드래그앤드롭");
	}

	clickSuppressedByDrag = true;
	draggingEl.style.opacity = '1';
	cleanupDrag();
	clearPreviewTimer(previewTimer);
}


function movePreview() {
	const list = document.getElementById('todo-list') as HTMLElement;
	const targetRect = targetEl?.getBoundingClientRect();
	const draggingRect = draggingEl?.getBoundingClientRect();
	const isMovingDown = draggingRect?.top! < targetRect?.top!;
	const nextEl = targetEl?.nextSibling;

	if (isMovingDown && nextEl !== draggingEl) {
		list.insertBefore(draggingEl!, nextEl!);
	} else if (!isMovingDown && targetEl !== draggingEl) {
		list.insertBefore(draggingEl!, targetEl!);
	}

	targetEl?.style.removeProperty("border-left");
}

function getDragAfterElement(container: HTMLElement, y: number): HTMLElement | null {
	const elements = document.elementsFromPoint(window.innerWidth / 2, y);

	for (const el of elements) {
		if (el.classList.contains('todo-item')) {
			return el as HTMLElement;
		}
	}
	return null;
}

function handleKeyDown(e: KeyboardEvent) {
	if (e.key === 'Escape' && isDragging) {
		if (draggingEl) {
			const list = document.getElementById("todo-list")!;
			list.insertBefore(draggingEl, originalNextSibling!); // nextSibling이 null이면 자동으로 맨 끝으로
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
