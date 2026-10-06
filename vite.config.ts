import { fileRoutes } from "filesystem-routing/vite";
import { defineConfig } from "vitest/config";
import solid from "@solidjs/vite-plugin";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	plugins: [
		solid({
			start: true,
			ssr: true,
			extensions: ['.jsx', '.tsx'],
			serverFunctions: true,
			diagnostics: true
		}),
		fileRoutes({ types: true }),
	],
	server: {
		port: 3000,
	},
	test: {
		environment: 'jsdom',
		globals: false,
		setupFiles: ['./vitest-setup.ts'],
		isolate: false,
	},
	build: {
		target: 'esnext',
		assetsInlineLimit: 0,
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src')
		}
	}
});
