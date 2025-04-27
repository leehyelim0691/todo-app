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
