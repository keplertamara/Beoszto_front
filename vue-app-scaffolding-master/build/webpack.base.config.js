import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { VueLoaderPlugin } from 'vue-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = dirname(fileURLToPath(import.meta.url));

const cssLoaders = [CssExtractPlugin.loader, 'css-loader', 'postcss-loader'];

// This config is concerned what's going on inside the /src and /test
export const baseConfig = {
	resolve: {
		alias: {
			'src': resolve(__dirname, '../src'),
			'test': resolve(__dirname, '../test'),
			'vue-i18n$': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
		},
		extensions: ['*', '.ts', '.js', '.vue', '.json'],
		mainFiles: ['index', 'index.vue'],
	},
	module: {
		rules: [
			{ test: /\.vue$/, loader: 'vue-loader' },
			{ test: /\.js$/, include: projectPaths(['src', 'test']), use: ['babel-loader'] },
			{ test: /\.ts$/, include: projectPaths(['src', 'test']), use: ['babel-loader',
				{ loader: 'ts-loader', options: { appendTsSuffixTo: ['\\.vue$'], compilerOptions: { noEmit: false }, transpileOnly: true } },
			] },
			{ test: /\.css$/, use: cssLoaders },
			{ test: /\.(scss|sass)$/, use: [...cssLoaders, 'resolve-url-loader', 'sass-loader'] },
			{ test: /\.(otf|ttf|woff|woff2)$/, type: 'asset/resource', generator: { filename: 'assets/[name]-[contenthash][ext]' } },
			// Transform JSON translations to i18n functions during bundling.
			{ test: /\.json$/, type: 'javascript/auto', use: ['@intlify/vue-i18n-loader'],
				include: projectPaths(['node_modules/@topdesk/translations__']),
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new CssExtractPlugin({ filename: 'assets/[name]-[contenthash].css' }),
		new HtmlWebpackPlugin(),
	],
	devtool: 'source-map',
};

function projectPaths(rootPaths) {
	const toAbsolute = rootRelative => resolve(__dirname, '../', rootRelative);
	return rootPaths.map(toAbsolute);
}
