import { fileURLToPath, URL } from 'node:url';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { env } from 'node:process';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
    const baseFolder = env.APPDATA ? path.join(env.APPDATA, 'ASP.NET', 'https') : path.join(env.HOME ?? '', '.aspnet', 'https');
    const certFile = path.join(baseFolder, 'web.client.pem');
    const keyFile = path.join(baseFolder, 'web.client.key');
    const https = command === 'serve' && env.DEV_HTTPS !== 'false' && existsSync(certFile) && existsSync(keyFile)
        ? { key: readFileSync(keyFile), cert: readFileSync(certFile) } : undefined;
    const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
        : env.ASPNETCORE_URLS?.split(';')[0] ?? 'https://localhost:7079';

    return {
        plugins: [plugin()],
        resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
        server: {
            proxy: { '^/weatherforecast': { target, secure: false } },
            port: Number.parseInt(env.DEV_SERVER_PORT || '60522', 10),
            https,
        },
    };
});
