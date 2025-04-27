export function renderInput(): HTMLElement {
	const container = document.createElement('div');
	container.innerHTML = `<input id="todo-input" type="text" placeholder="What needs to be done?" />`;

	return container;
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

					const deleteButton = document.createElement('button');
					deleteButton.textContent = '삭제';
					deleteButton.className = 'delete-button';
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