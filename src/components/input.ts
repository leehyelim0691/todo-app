export function renderInput(): HTMLElement {
	const container = document.createElement('div');

	const input = document.createElement('input');
	input.id = 'todo-input';
	input.type = 'text';
	input.placeholder = 'What needs to be done?';

	container.appendChild(input);

	return container;
}