import {renderInput} from './components/input';
import { renderList, setupInputHandler } from './components/list';
import {renderInfo, setupClearCompletedHandler, setupFilterHandlers} from './components/info';

function init() {
	const app = document.getElementById('app');
	if (!app) {
		console.error('App root element not found!');
		return;
	}

	const container = document.createElement('div');
	container.className = 'todo-container';

	const inputSection = renderInput(); // 입력부
	const listSection = renderList(); // 목록 출력부
	const infoSection = renderInfo(); // 정보 출력부

	container.appendChild(inputSection);
	container.appendChild(listSection);
	container.appendChild(infoSection);

	app.appendChild(container);

	setupInputHandler();
	setupFilterHandlers();
	setupClearCompletedHandler();
}

// HTML 이 로드된 다음 init() 실행
document.addEventListener('DOMContentLoaded', init);

