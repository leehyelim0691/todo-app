const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.ts',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	plugins: [
		new ESLintPlugin({
			overrideConfigFile: path.resolve(__dirname, '.eslintrc.json'),
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		hot: true,
		port: 3000,
		open: true,
	},
};

