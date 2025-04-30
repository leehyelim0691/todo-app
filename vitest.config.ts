import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'jsdom', // DOM 사용 가능하도록 설정
		globals: true,        // describe, it, expect 등을 전역으로 사용 가능하게 함
		setupFiles: [],       // 필요시 설정 파일 추가 가능
	},
});