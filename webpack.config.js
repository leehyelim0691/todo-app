const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

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
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
		// new ESLintPlugin({
		// 	extensions: ['ts', 'tsx', 'js'],
		// })
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		hot: true,
		port: 3000,
		open: true, // 브라우저 자동 열기
	},
};
