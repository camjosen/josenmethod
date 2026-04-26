import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
export default defineConfig(function (_a) {
    var mode = _a.mode;
    // Load env from repo root
    var env = loadEnv(mode, path.resolve(__dirname, '../..'), '');
    return {
        plugins: [tailwindcss(), react()],
        define: {
            'import.meta.env.VITE_WORKOS_CLIENT_ID': JSON.stringify(env.WORKOS_CLIENT_ID),
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@backend': path.resolve(__dirname, '../backend/src'),
                '@reading_app': path.resolve(__dirname, '../reading_app'),
            },
        },
        server: {
            port: parseInt(env.FRONTEND_PORT || '5173'),
            strictPort: true,
            host: true,
        },
    };
});
