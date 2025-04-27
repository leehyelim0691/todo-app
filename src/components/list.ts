let todoIdCounter = 0;

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

						const items = Array.from(list.children) as HTMLElement[];

						// 미완료 항목과 완료 항목 분리
						const activeItems = items
							.filter(item => {
								const innerSpan = item.querySelector('span');
								return innerSpan && !innerSpan.classList.contains('completed');
							})
							.sort((a, b) => {
								const idA = Number(a.dataset.id);
								const idB = Number(b.dataset.id);
								return idB - idA; // 내림차순 정렬
							});

						const completedItems = items.filter(item => {
							const innerSpan = item.querySelector('span');
							return innerSpan && innerSpan.classList.contains('completed');
						});

						// 리스트 비우고 다시 append
						list.innerHTML = '';

						activeItems.forEach(item => {
							list.appendChild(item);
						});

						completedItems.forEach(item => {
							list.appendChild(item);
						});
					});


					deleteButton.addEventListener('click', () => {
						li.remove();
						console.log("todo 삭제")
					});

					li.appendChild(span);
					li.appendChild(deleteButton);
					list.prepend(li);

					input.value = '';

					console.log("todo 등록")
				}
			}
		});
	}
}