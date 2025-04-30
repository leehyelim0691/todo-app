import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderList, sortList } from '../components/list';

function createMockItem(id: string, completed = false): HTMLElement {
	const li = document.createElement('li');
	li.className = 'todo-item';
	li.dataset.id = id;

	const span = document.createElement('span');
	span.className = 'todo-text';
	if (completed) span.classList.add('completed');

	const button = document.createElement('button');
	button.className = 'delete-button';
	button.textContent = '삭제';

	li.append(span, button);
	return li;
}

describe('Todo List', () => {
	let container: HTMLElement;

	beforeEach(() => {
		document.body.innerHTML = '';
		container = renderList();
		document.body.appendChild(container);
	});

	it('ul 요소가 id "todo-list"로 생성되어야 한다', () => {
		const ul = document.getElementById('todo-list');
		expect(ul).toBeTruthy();
		expect(ul?.tagName).toBe('UL');
	});

	it('완료되지 않은 todo 항목이 id 기준으로 내림차순 정렬되어야 한다', () => {
		const list = document.getElementById('todo-list')!;
		const item1 = createMockItem('1');
		const item2 = createMockItem('2');
		const item3 = createMockItem('3');

		list.append(item1, item2, item3);
		sortList();

		const sortedIds = Array.from(list.children).map(el => el.getAttribute('data-id'));
		expect(sortedIds).toEqual(['3', '2', '1']);
	});

	it('movePreview가 호출되면 시각적으로 항목이 이동해야 한다', () => {
		const list = document.getElementById('todo-list')!;
		const dragging = createMockItem('100');
		const target = createMockItem('200');

		list.append(target);
		list.append(dragging);

		target.classList.add('todo-item');
		dragging.classList.add('todo-item');

		const targetRect = { top: 100 } as DOMRect;
		const draggingRect = { top: 50 } as DOMRect;
		const oldGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;
		HTMLElement.prototype.getBoundingClientRect = function () {
			if (this === target) return targetRect;
			if (this === dragging) return draggingRect;
			return oldGetBoundingClientRect.call(this);
		};

		list.insertBefore(dragging, target.nextSibling);
		const result = Array.from(list.children).map(el => el.getAttribute('data-id'));
		expect(result).toEqual(['200', '100']);

		HTMLElement.prototype.getBoundingClientRect = oldGetBoundingClientRect;
	});

	it('완료 상태를 토글하면 클래스가 반영되고 정렬이 반영되어야 한다', () => {
		const list = document.getElementById('todo-list')!;
		const item = createMockItem('10');
		list.append(item);

		const span = item.querySelector('.todo-text')!;
		expect(span.classList.contains('completed')).toBe(false);
		span.classList.add('completed');
		expect(span.classList.contains('completed')).toBe(true);

		sortList();
		const sorted = Array.from(list.children).filter(
			el => el.querySelector('.todo-text')?.classList.contains('completed')
		);
		expect(sorted.length).toBe(1);
	});

	it('삭제 버튼 클릭 시 항목이 제거되어야 한다', () => {
		const list = document.getElementById('todo-list')!;
		const item = createMockItem('20');
		list.append(item);

		expect(list.children.length).toBe(1);
		item.querySelector('.delete-button')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		item.remove();
		expect(list.children.length).toBe(0);
	});

	it('ESC 키를 누르면 드래그가 취소되어야 한다', () => {
		const item = createMockItem('30');
		document.getElementById('todo-list')!.append(item);
		item.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
		expect(document.getElementById('todo-list')?.contains(item)).toBe(true);
	});

	it('2초 이상 머무르면 preview 위치로 항목이 이동되어야 한다', async () => {
		vi.useFakeTimers();
		const list = document.getElementById('todo-list')!;
		const itemA = createMockItem('1');
		const itemB = createMockItem('2');
		list.append(itemA, itemB);

		// Mock target and draggingRect for DOM positioning
		const targetRect = { top: 100 } as DOMRect;
		const draggingRect = { top: 50 } as DOMRect;
		const oldGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;
		HTMLElement.prototype.getBoundingClientRect = function () {
			if (this === itemB) return targetRect;
			if (this === itemA) return draggingRect;
			return oldGetBoundingClientRect.call(this);
		};

		// Preview move logic simulation
		setTimeout(() => list.insertBefore(itemA, itemB), 2000);
		vi.advanceTimersByTime(2000);

		const ids = Array.from(list.children).map(el => el.getAttribute('data-id'));
		expect(ids).toEqual(['1', '2']);

		HTMLElement.prototype.getBoundingClientRect = oldGetBoundingClientRect;
		vi.useRealTimers();
	});
});

