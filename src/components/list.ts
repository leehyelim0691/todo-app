import { applyCurrentFilter, updateClearCompletedButton, updateItemsLeft } from "./info";

let todoIdCounter = 0;
let draggingEl: HTMLElement | null = null;
let isDragging = false;
let targetEl: HTMLElement | null = null;

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

	draggingEl = el;
	isDragging = true;

	document.addEventListener('mousemove', handleMouseMove);
	document.addEventListener('mouseup', handleMouseUp);

	el.style.opacity = '0.5';
}

function handleMouseMove(e: MouseEvent) {
	if (!isDragging || !draggingEl) return;

	const list = document.getElementById('todo-list') as HTMLElement;
	const afterElement = getDragAfterElement(list, e.clientY);

	// 이전에 있던 강조 제거
	if (targetEl) {
		targetEl.style.borderLeft = '';
	}

	targetEl = afterElement;

	// 새로 강조
	if (targetEl) {
		targetEl.style.borderLeft = '4px solid limegreen';
	}
}

function handleMouseUp(e: MouseEvent) {
	if (!isDragging || !draggingEl) return;

	if (targetEl) {
		const list = document.getElementById('todo-list') as HTMLElement;

		if (targetEl.nextSibling) {
			list.insertBefore(draggingEl, targetEl.nextSibling);
		} else {
			list.appendChild(draggingEl);
		}

		targetEl.style.borderLeft = '';
	}

	draggingEl.style.opacity = '1';
	isDragging = false;
	draggingEl = null;
	targetEl = null;

	document.removeEventListener('mousemove', handleMouseMove);
	document.removeEventListener('mouseup', handleMouseUp);
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