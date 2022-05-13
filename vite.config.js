import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'

/**
 * @type {import('vite').UserConfig}
 */
const config = {
    root: './src',
    build: {
        outDir: '../dist',
        emptyOutDir: true
    },
    plugins: [handlebars({
        partialDirectory: resolve(__dirname, './src/partials')
    })]
};

export default defineConfig(({command, mode}) => ({
    ...config,
    base: command === 'build' ? '/sf-20200619' :''
}));