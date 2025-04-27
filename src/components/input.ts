export function renderInput(): HTMLElement {
	const container = document.createElement('div');
	container.innerHTML = `<input id="todo-input" type="text" placeholder="What needs to be done?" />`;

	return container;
}