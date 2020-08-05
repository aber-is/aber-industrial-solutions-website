const webpack = require('webpack');
const path = require('path');

const de = require(path.resolve(__dirname, 'src/data/de.json'));
const en = require(path.resolve(__dirname, 'src/data/en.json'));

const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
	return {
		entry: [
			path.resolve(__dirname, './src/index.js')
		],
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: !env.production ? '[name].js' : '[name].[hash].js',
			publicPath: !env.production ? 'https://aber-is.de/' : '/',
		},
		optimization: {
			minimizer: [
				new TerserJSPlugin({}),
				new OptimizeCSSAssetsPlugin({}),
			],
		},
		plugins: [
			new HtmlWebPackPlugin({
				filename: path.resolve(__dirname, 'dist/en/index.html'),
				template: path.resolve(__dirname, 'src/index.pug'),
				templateParameters: en,
			}),
			new HtmlWebPackPlugin({
				filename: path.resolve(__dirname, 'dist/de/index.html'),
				template: path.resolve(__dirname, 'src/index.pug'),
				templateParameters: de,
			}),
			new MiniCssExtractPlugin({
				filename: env.production ? '[name].[hash].css' : '[name].css',
			}),
			new CompressionPlugin(),
			new CleanWebpackPlugin(),
		],
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{
					test: /\.pug$/,
					exclude: /node_modules/,
					loader: 'pug-loader',
				},
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					use: [
						'style-loader',
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								hmr: !env.production,
							},
						},
						'css-loader',
						'postcss-loader',
						{
							loader: 'sass-loader',
							options: {
								prependData: `$items: ${en.header.links.length};`,
							},
						},
					],
				},
				{
					test: /\.css$/,
					exclude: /node_modules/,
					use: ['style-loader', 'css-loader', 'postcss-loader'],
				},
				{
					test: /\.(png|jpg|gif)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[hash].[ext]',
								outputPath: 'media/'
							},
						},
						{
							loader: 'image-webpack-loader',
							options: {
								mozjpeg: {
									progressive: true,
									quality: 65,
								},
								optipng: {
									enable: true,
								},
							},
						},
					],
				},
			],
		},
		devServer: {
			contentBase: path.resolve(__dirname, 'dist/'),
		},
	};
};
