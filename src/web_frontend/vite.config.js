import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import qrcode from 'qrcode-terminal';
import { defineConfig, loadEnv } from 'vite';
function hostQrCode(targetPath) {
    if (targetPath === void 0) { targetPath = '/host'; }
    return {
        name: 'host-qr-code',
        configureServer: function (server) {
            var originalPrintUrls = server.printUrls.bind(server);
            server.printUrls = function () {
                var _a, _b;
                originalPrintUrls();
                var networkUrl = (_b = (_a = server.resolvedUrls) === null || _a === void 0 ? void 0 : _a.network) === null || _b === void 0 ? void 0 : _b[0];
                if (!networkUrl)
                    return;
                var url = networkUrl.replace(/\/$/, '') + targetPath;
                qrcode.generate(url, { small: true }, function (qr) {
                    console.log("\n  Scan to open ".concat(url, " on your phone:\n").concat(qr));
                });
            };
        },
    };
}
export default defineConfig(function (_a) {
    var mode = _a.mode;
    // Load env from repo root
    var env = loadEnv(mode, path.resolve(__dirname, '../..'), '');
    return {
        plugins: [tailwindcss(), react(), hostQrCode()],
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
