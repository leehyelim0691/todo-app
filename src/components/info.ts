export function renderInfo(): HTMLElement {
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

let currentFilter: 'all' | 'active' | 'completed' = 'all';

export function setupFilterHandlers(): void {
	const allButton = document.getElementById('filter-all') as HTMLButtonElement;
	const activeButton = document.getElementById('filter-active') as HTMLButtonElement;
	const completedButton = document.getElementById('filter-completed') as HTMLButtonElement;

	const filterButtons = [allButton, activeButton, completedButton];

	function clearSelected(): void {
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

export function updateItemsLeft(): void {
	const list = document.getElementById('todo-list') as HTMLUListElement;
	const itemsLeftSpan = document.getElementById('items-left') as HTMLSpanElement;
	const todos = Array.from(list.children) as HTMLElement[];

	let count = 0;

	if (currentFilter === 'all') {
		count = todos.length;
	} else if (currentFilter === 'active') {
		count = todos.filter(item => {
			const span = item.querySelector('span');
			return span && !span.classList.contains('completed');
		}).length;
	} else if (currentFilter === 'completed') {
		count = todos.filter(item => {
			const span = item.querySelector('span');
			return span && span.classList.contains('completed');
		}).length;
	}

	itemsLeftSpan.textContent = `${count} items left`;
}

export function applyCurrentFilter(): void {
	const list = document.getElementById('todo-list') as HTMLUListElement;
	const items = Array.from(list.children) as HTMLElement[];

	items.forEach(item => {
		const span = item.querySelector('span');
		if (!span) return;

		if (currentFilter === 'all') {
			item.style.display = 'flex';
		} else if (currentFilter === 'active') {
			item.style.display = span.classList.contains('completed') ? 'none' : 'flex';
		} else if (currentFilter === 'completed') {
			item.style.display = span.classList.contains('completed') ? 'flex' : 'none';
		}
	});
}

export function updateClearCompletedButton(): void {
	const list = document.getElementById('todo-list') as HTMLUListElement;
	const clearButton = document.getElementById('clear-completed') as HTMLButtonElement;

	const completedCount = Array.from(list.children).filter(item => {
		const span = item.querySelector('span');
		return span && span.classList.contains('completed');
	}).length;

	clearButton.textContent = `Clear Completed (${completedCount})`;
}

export function setupClearCompletedHandler(): void {
	const list = document.getElementById('todo-list') as HTMLUListElement;
	const clearButton = document.getElementById('clear-completed') as HTMLButtonElement;

	clearButton.addEventListener('click', () => {
		Array.from(list.children).forEach(item => {
			const span = item.querySelector('span');
			if (span && span.classList.contains('completed')) {
				list.removeChild(item);
			}
		});

		console.log("todo 완료항목 삭제")

		applyCurrentFilter();
		updateItemsLeft();
		updateClearCompletedButton();
	});
}
