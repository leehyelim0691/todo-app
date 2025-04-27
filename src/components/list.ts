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
						console.log("todo 완료 토글")
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