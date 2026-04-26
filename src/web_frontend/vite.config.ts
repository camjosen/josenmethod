import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import qrcode from 'qrcode-terminal';
import { defineConfig, loadEnv, type Plugin } from 'vite';

function hostQrCode(targetPath = '/host'): Plugin {
  return {
    name: 'host-qr-code',
    configureServer(server) {
      const originalPrintUrls = server.printUrls.bind(server);
      server.printUrls = () => {
        originalPrintUrls();
        const networkUrl = server.resolvedUrls?.network?.[0];
        if (!networkUrl) return;
        const url = networkUrl.replace(/\/$/, '') + targetPath;
        qrcode.generate(url, { small: true }, (qr) => {
          console.log(`\n  Scan to open ${url} on your phone:\n${qr}`);
        });
      };
    },
  };
}

export default defineConfig(({ mode }) => {
  // Load env from repo root
  const env = loadEnv(mode, path.resolve(__dirname, '../..'), '');

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
