import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// The Webpack Dev Server uses Express under the hood
export function DevServerConfig({ publicPath = '/', apiPath = '/' } = {}) { /* eslint-disable-line @typescript-eslint/no-unused-vars */
	return {
		headers: {
			// This rule disables the unsafe eval() security risk during development
			'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';",
		},
		historyApiFallback: { index: publicPath },
		devMiddleware: { publicPath },
		port: 3000,
		static: false,
		/* scaffolding-disable unless keepExamples */
		setupMiddlewares: setupMockApi({ apiPath }),
		/* scaffolding-enable */
	};
}

/* scaffolding-disable unless keepExamples */

// As the volume of a local mock server grows eventually it's a good idea to
// extract example endpoints to a "/dev" directory.
// Note that local mocks work best for mostly read-only APIs.
// Maintaining mocks of the PUT / POST / DELETE requests the are kept in sync
// with the real API may impose unwanted maintenance overhead
function setupMockApi({ apiPath }) {
	// A Webpack Dev Sever hook accepts an Express app to tweak in order to make development simpler
	return (middlewares, { app }) => {
		// Often a Dev server simply proxies API calls to another host
		app.get(`${apiPath}snippets`, async (_req, res) => {
			return res.json(await readJson('../.vscode/scaffolding.code-snippets'));
		});

		return middlewares;
	};
}

async function readJson(path) {
	const text = await readFile(resolve(__dirname, path));
	return JSON.parse(text);
}
/* scaffolding-enable */
