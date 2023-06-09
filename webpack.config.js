const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: process.env.NODE_ENV,
	entry: './client/index.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	devServer: {
		static: {
			publicPath: './build',
			directory: path.resolve(__dirname, 'build')
		},
		proxy: {
			'/api': 'http://localhost:3000'
		},
		historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'development',
			template: './index.html'
		})
	],
	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Compiles Sass to CSS
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader']
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader'
					}
				]
			}
		]
	},

	performance: {
		hints: false
	}
};
