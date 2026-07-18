import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    build: {
        target: 'es2020',
        rollupOptions: {
            output: {
                manualChunks: {
                    'practice-mode': [
                        'src/views/PracticeView.vue',
                        'src/domain/auto-scroll/engine.ts',
                    ],
                },
            },
        },
    },
});
