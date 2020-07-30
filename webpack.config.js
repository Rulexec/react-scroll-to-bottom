const _path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: _path.join(__dirname, 'src/main.jsx'),
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /\/node_modules\//,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'scroll-to-bottom demo',
		}),
	],
	devServer: {
		hot: true,
	},
};
