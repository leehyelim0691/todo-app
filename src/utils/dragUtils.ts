export function clearPreviewTimer(timer: number | null): number | null {
	if (timer !== null) {
		clearTimeout(timer);
	}
	return null;
}

export function updateMirrorPosition(
	x: number,
	y: number,
	mirrorEl: HTMLElement | null,
): void {
	if (!mirrorEl) return;
	mirrorEl.style.left = x + 10 + 'px';
	mirrorEl.style.top = y + 10 + 'px';
}

export function isOutsideListArea(
	clientX: number,
	clientY: number,
	listEl: HTMLElement
): boolean {
	const rect = listEl.getBoundingClientRect();
	return (
		clientX < rect.left ||
		clientX > rect.right ||
		clientY < rect.top ||
		clientY > rect.bottom
	);
}