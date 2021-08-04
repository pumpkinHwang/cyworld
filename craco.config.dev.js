const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CracoAlias = require('craco-alias')
const c = require('ansi-colors')

const randomVehicle = () => {
	const vehicle = ['🚀', '🚙', '🚌', '🚑', '🐢', '🦄']
	return vehicle[Math.floor(Math.random() * (vehicle.length - 1))]
}

module.exports = {
	mode: 'development',
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
				// 'no-dupe-keys': 'off',
				'no-dupe-class-members': 'off',
				'no-redeclare': 'off',
				'no-mixed-operators': 'off',
				'no-multi-str': 'off',
				// 'no-self-assign': 'off',
				// 'no-self-compare': 'off',
				// 'no-unreachable': 'off',
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
				// 'no-useless-rename': 'off',
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
				// 'use-isnan': 'off',
				'react/no-direct-mutation-state': 'off',
				// 'react/jsx-pascal-case': 'off',
				'react/react-in-jsx-scope': 'off'
			}
		}
	},
    babel: {
        plugins: [
			['@babel/plugin-proposal-decorators', { 'legacy': true }],
			['@babel/plugin-proposal-class-properties', { 'loose': true }],
			['@babel/plugin-transform-react-jsx', { 'runtime': 'automatic' }],
			['babel-plugin-styled-components', { 'displayName': true }],
			['@loadable/babel-plugin']
		]
    },
	webpack: {
		configure: webpackConfig => {
			// react fast refresh
			const babelLoaderRule = webpackConfig.module.rules
			.find((x) => Array.isArray(x.oneOf))
			.oneOf.find(
				(x) =>
				x.loader &&
				x.loader.includes('babel-loader') &&
				x.options &&
				x.options.presets &&
				x.options.presets.some((p) => p.includes('babel-preset-react-app'))
			)
			babelLoaderRule.options.plugins.push(require.resolve('react-refresh/babel'))

			webpackConfig.optimization = {
				...webpackConfig.optimization, 
				runtimeChunk: false,
				splitChunks: {
					cacheGroups: {
						default: false
					}
				},
				minimize: false
			}

			webpackConfig.output = {
				...webpackConfig.output, 
				filename: 'static/js/[name].js'
			}

			return webpackConfig
		},
		plugins: [
			new ReactRefreshWebpackPlugin({
				overlay: false
			}),
			new ProgressBarPlugin({
				format: `${c.yellow.bold(`${randomVehicle()} Compiling`)} [${c.green(':bar')}] ${c.greenBright.bold(':percent')} (:elapsed seconds) - ${c.red.bold('[NO]')} splitChunks / minimization.`,
				clear: true
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