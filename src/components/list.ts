import { applyCurrentFilter, updateClearCompletedButton, updateItemsLeft } from "./info";

let todoIdCounter = 0;
let draggingEl: HTMLElement | null = null;
let isDragging = false;
let targetEl: HTMLElement | null = null;
let mirrorEl: HTMLElement | null = null;
let previewTimer: number | null = null;

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
				if (value !== '') {
					const li = document.createElement('li');
					li.className = 'todo-item';
					li.dataset.id = (todoIdCounter++).toString(); // 등록 순서 저장

					const span = document.createElement('span');
					span.textContent = value;
					span.className = 'todo-text';

					const deleteButton = document.createElement('button');
					deleteButton.textContent = '삭제';
					deleteButton.className = 'delete-button';

					li.addEventListener('click', (e: MouseEvent): void => {
						if ((e.target as HTMLElement).tagName === 'BUTTON') {
							return;
						}

						span.classList.toggle('completed');
						const isCompleted = span.classList.contains('completed');

						if (isCompleted) {
							console.log("todo 완료 토글");
						} else {
							console.log("todo 미완료 토글");
						}

						sortList();
						applyCurrentFilter();
						updateItemsLeft();
						updateClearCompletedButton();
					});

					li.addEventListener('mousedown', (e) => startDrag(e, li));

					deleteButton.addEventListener('click', () => {
						li.remove();
						console.log("todo 삭제")
						updateItemsLeft();
						updateClearCompletedButton();
					});

					li.appendChild(span);
					li.appendChild(deleteButton);
					list.prepend(li);

					input.value = '';

					console.log("todo 등록")

					updateItemsLeft();
					updateClearCompletedButton();
				}
			}
		});
	}
}

export function sortList(): void {
	const list = document.getElementById('todo-list') as HTMLUListElement;
	const items = Array.from(list.children) as HTMLElement[];

	const activeItems = items
		.filter(item => {
			const span = item.querySelector('span');
			return span && !span.classList.contains('completed');
		})
		.sort((a, b) => {
			const idA = Number(a.dataset.id);
			const idB = Number(b.dataset.id);
			return idB - idA; // id 기준 내림차순
		});

	const completedItems = items.filter(item => {
		const span = item.querySelector('span');
		return span && span.classList.contains('completed');
	});

	list.innerHTML = '';

	activeItems.forEach(item => list.appendChild(item));
	completedItems.forEach(item => list.appendChild(item));
}


function startDrag(e: MouseEvent, el: HTMLElement) {
	if ((e.target as HTMLElement).tagName === 'BUTTON') return;

	const span = el.querySelector('.todo-text');
	if (span?.classList.contains('completed')) {
		return; // 완료된 항목이면 드래그 시작 안함
	}

	draggingEl = el;
	isDragging = true;

	document.addEventListener('mousemove', handleMouseMove);
	document.addEventListener('mouseup', handleMouseUp);
	document.addEventListener('keydown', handleKeyDown);

	el.style.opacity = '0.3';

	mirrorEl = el.cloneNode(true) as HTMLElement;
	mirrorEl.classList.add('mirror');

	const rect = el.getBoundingClientRect();
	mirrorEl.style.width = rect.width + 'px';
	mirrorEl.style.height = rect.height + 'px';

	document.body.appendChild(mirrorEl);

	updateMirrorPosition(e.clientX, e.clientY); // 시작 위치 잡기
}

function cancelDrag(fullCancel = false) {
	if (!isDragging || !draggingEl) return;

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

function handleMouseMove(e: MouseEvent) {
	if (!isDragging || !draggingEl) return;

	if (mirrorEl) {
		updateMirrorPosition(e.clientX, e.clientY);
	}

	const list = document.getElementById('todo-list') as HTMLElement;
	const listRect = list.getBoundingClientRect(); // 리스트 위치 정보 가져오기

	// 리스트 영역 벗어났는지 체크
	if (
		e.clientX < listRect.left ||
		e.clientX > listRect.right ||
		e.clientY < listRect.top ||
		e.clientY > listRect.bottom
	) {
		cancelDrag(false);
		return;
	}

	const afterElement = getDragAfterElement(list, e.clientY);

	// target 바뀌면
	if (targetEl && targetEl !== afterElement) {
		targetEl.style.borderLeft = '';
		clearPreviewTimer(); // 타이머 초기화
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

		// 프리뷰용 타이머 설정
		clearPreviewTimer();
		previewTimer = window.setTimeout(() => {
			if (targetEl && draggingEl) {
				// 이동하기 전에 현재 targetEl의 border를 지우기
				targetEl.style.borderLeft = '';

				const list = document.getElementById('todo-list') as HTMLElement;

				if (targetEl.nextSibling) {
					list.insertBefore(draggingEl, targetEl.nextSibling);
				} else {
					list.appendChild(draggingEl);
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
		const list = document.getElementById('todo-list') as HTMLElement;

		if (targetEl.nextSibling) {
			list.insertBefore(draggingEl, targetEl.nextSibling);
		} else {
			list.appendChild(draggingEl);
		}

		targetEl.style.borderLeft = '';

		console.log("todo 드래그앤드롭")
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
		cancelDrag(true);
		console.log("todo 드래그앤드롭 취소");
	}
}

function updateMirrorPosition(x: number, y: number) {
	if (!mirrorEl) return;
	mirrorEl.style.left = x + 10 + 'px';
	mirrorEl.style.top = y + 10 + 'px';
}

function clearPreviewTimer() {
	if (previewTimer !== null) {
		clearTimeout(previewTimer);
		previewTimer = null;
	}
}
