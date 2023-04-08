const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: process.env.NODE_ENV,
	entry: './client/index.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/build',
		filename: 'bundle.js'
	},

	resolve: {
		// Enable importing JS / JSX files without specifying their extension
		extensions: ['.js', '.jsx', '.tsx', '.ts']
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
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: ['@babel/plugin-syntax-jsx']
					}
					// exclude: /npm_modules/
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
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	devServer: {
		static: {
			publicPath: './build',
			directory: path.resolve(__dirname, 'build/index.html')
		},
		proxy: {
			'/': 'http://localhost:3000'
		},
		compress: true,
		port: 8080
		// historyApiFallback: true
	},
	performance: {
		hints: false
	}
};
