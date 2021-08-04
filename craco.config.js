const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CracoAlias = require('craco-alias')
const c = require('ansi-colors')

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV !== 'production'

const randomThings = () => {
	const things = ['🐶', '🐱', '🐻', '🐹', '🐷', '🐰', '🦊', '🐮', '🐨']
	return things[Math.floor(Math.random() * things.length)]
}

module.exports = {
	mode: isDevelopment ? 'development' : 'production',
	eslint: {
		enable: true,
		configure: {
			rules: {
				'eqeqeq': 'off',
				'array-callback-return': 'off',
				'no-unused-vars': 'off',
				'no-useless-constructor': 'off',
				'no-useless-escape': 'off',
				'no-useless-concat': 'off',
				'no-extra-bind': 'off',
				'no-script-url': 'off',
				'no-dupe-keys': 'off', //
				'no-dupe-class-members': 'off',
				'no-redeclare': 'off',
				'no-mixed-operators': 'off',
				'no-multi-str': 'off',
				'no-self-assign': 'off', //
				'no-self-compare': 'off', //
				'no-unreachable': 'off', //
				'no-cond-assign': 'off',
				'no-const-assign': 'off',
				'no-whitespace-before-property': 'off',
				'no-throw-literal': 'off',
				'no-loop-func': 'off',
				'no-lone-blocks': 'off',
				'no-sequences': 'off',
				'no-sparse-arrays': 'off',
				'no-new-func': 'off',
				'no-array-constructor': 'off',
				'no-useless-rename': 'off', //
				'jsx-a11y/alt-text': 'off',
				'jsx-a11y/anchor-is-valid': 'off',
				'jsx-a11y/anchor-has-content': 'off',
				'jsx-a11y/heading-has-content': 'off',
				'jsx-a11y/alt-text': 'off',
				'jsx-a11y/role-supports-aria-props': 'off',
				'jsx-a11y/img-redundant-alt': 'off',
				'react/jsx-no-duplicate-props': 'off',
				'react/jsx-no-target-blank': 'off',
				'react-hooks/exhaustive-deps': 'off',
				'default-case': 'off',
				'use-isnan': 'off', //
				'react/no-direct-mutation-state': 'off',
				'react/jsx-pascal-case': 'off', //
				'react/react-in-jsx-scope': 'off',
				'no-eval': 'off'
			}
		}
	},
    babel: {
        plugins: [
			['@babel/plugin-proposal-decorators', { 'legacy': true }],
			['@babel/plugin-proposal-class-properties', { 'loose': true }],
			['babel-plugin-styled-components', { 'displayName': isDevelopment }]
		]
    },
	webpack: {
		configure: webpackConfig => {

			webpackConfig.optimization = {
				...webpackConfig.optimization, 
				namedModules: isDevelopment,
				namedChunks: isDevelopment,
				moduleIds: isDevelopment ? 'named' : false,
				chunkIds: isDevelopment ? 'named' : false,
				removeAvailableModules: true, // Remove modules from chunks when these modules are already included in all parents.
				removeEmptyChunks: true, // Remove chunks which are empty.
				mergeDuplicateChunks: true, // Merge chunks which contain the same modules.
				splitChunks: {
					chunks: 'async',
					minSize: 1000 * 20, // 20kb
					maxSize: 1000 * 1000, // 1000kb
					minChunks: 1,
					maxAsyncRequests: 30,
					maxInitialRequests: 30,
					automaticNameDelimiter: '-',
					cacheGroups: {
						vendors: {
							priority: -10,
							test: /node_modules\/.*/,
							name: 'vendors'
						},
						default: {
							priority: -20,
							name: 'bundle',
							minChunks: 2,
							reuseExistingChunk: true,
						}
					}
				},
				runtimeChunk: {
					name: 'manifest',
				},
				// Minimization
				minimize: isProduction,
				minimizer: [
					new TerserPlugin({
						terserOptions: {
							ecma: undefined,
							parse: {},
							compress: {
								warnings: false,
								drop_console: false
							},
							module: false
						},
						parallel: 6,
						extractComments: false
					})
				]
			}

			return webpackConfig
		},
		plugins: [
			isDevelopment && new ProgressBarPlugin({
				format: `${c.yellow.bold(`${randomThings()} Compiling`)} [${c.green(':bar')}] ${c.greenBright.bold(':percent')} (:elapsed seconds)`,
				clear: true
			}),
			isProduction && new CompressionPlugin(),
			isDevelopment && new BundleAnalyzerPlugin({
				openAnalyzer: false,
				analyzerPort: 7000
			})
		].filter(Boolean)
	},
	plugins: [
        {
			plugin: CracoAlias,
			options: {
				source: 'jsconfig',
				baseUrl: './src'
			}
		}
	]
}