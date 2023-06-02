import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { baseConfig } from './webpack.base.config.js';
import { DevServerConfig } from './dev-server.config.js';
import pkg from '../package.json' assert { type: 'json' };

const { DefinePlugin } = webpack;
const __dirname = dirname(fileURLToPath(import.meta.url));

const isDevMode = process.env.NODE_ENV === 'development';

const apiPath = process.env.API_PATH || pkg.config.default_api_path;
const publicPath = process.env.PUBLIC_PATH || pkg.config.default_public_path;

// This config is concerned about the project in general
export default {
	...baseConfig,
	cache: false,
	entry: {
		app: './src/main.ts',
	},
	output: {
		path: resolve(__dirname, '../dist'),
		publicPath,
		filename: 'assets/[name]-[contenthash].js',
		clean: true,
	},
	target: 'web',
	optimization: {
		// The runtime chunk is used when loading chunks of code split by Webpack
		runtimeChunk: 'single',
		// Make sure the vendor code (AKA node_modules) is split from app code for better caching
		splitChunks: { chunks: 'all' },
	},
	plugins: [
		...baseConfig.plugins,
		// Allow client code to access publicPath via process.env.PUBLIC_PATH as a constant at build time
		new DefinePlugin({
			'process.env.API_PATH': JSON.stringify(apiPath),
			'process.env.PUBLIC_PATH': JSON.stringify(publicPath),

			// Setting these flags will enable proper tree-shaking
			/** Feature flags for Vue */
			'__VUE_OPTIONS_API__': JSON.stringify(true),
			'__VUE_PROD_DEVTOOLS__': JSON.stringify(false),

			/** Feature flags for Vue I18n */
			'__VUE_I18N_FULL_INSTALL__': JSON.stringify(true),
			'__VUE_I18N_LEGACY_API__': JSON.stringify(false),
			'__INTLIFY_PROD_DEVTOOLS__': JSON.stringify(false),
		}),
		// Used to check what ends up in the bundle
		...conditionally(process.env.ANALYZE, new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			generateStatsFile: true,
		})),
	],
	performance: {
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
	// Make sure Webpack runs in production mode when in doubt
	mode: isDevMode ? 'development' : 'production',
	devServer: DevServerConfig({ publicPath, apiPath }),
};

function conditionally(condition, value) {
	return condition ? [].concat(value) : [];
}
