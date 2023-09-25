const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/main.js',
	output: {
		compareBeforeEmit: false,
		path: path.resolve(__dirname, 'public/'),
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.mjs', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css?$/,
				exclude: /node_modules/,
				use: {
					loader: 'css-loader',
				},
			},
		],
	},
	devServer: {
		port: 3001,
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: './src/index.html',
			filename: 'index.html',
			port: 3001,
		}),
	],
};
