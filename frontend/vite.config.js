import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    base: '/Primer-repositorio/',

    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'js/*',
                    dest: '.'
                },
                {
                    src: 'img',
                    dest: '.'
                }
            ]
        })
    ],

    server: {
        port: 5173
    },

    build: {
        rolldownOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
                login: resolve(__dirname, 'login.html'),
                noticia: resolve(__dirname, 'noticia.html'),
                panel: resolve(__dirname, 'panel.html')
            }
        }
    }
});