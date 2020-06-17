const path = require('path');
const webpack = require('webpack');
const data = require(path.resolve(__dirname, 'src/data/main.json'));
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env) => {
	return {
		entry: path.resolve(__dirname, './src/index.js'),
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: !env.production ? '[name].js' : '[name].[hash].js',
		},
		optimization: {
			minimizer: [
				new TerserJSPlugin({}),
				new OptimizeCSSAssetsPlugin({}),
			],
		},
		plugins: [
			new HtmlWebPackPlugin({
				filename: path.resolve(__dirname, 'dist/index.html'),
				template: path.resolve(__dirname, 'src/index.pug'),
				templateParameters: data,
			}),
			new MiniCssExtractPlugin({
				filename: env.production ? '[name].[hash].css' : '[name].css',
			}),
			new CompressionPlugin(),
		],
		module: {
			rules: [
				{
					test: /\.js$/,
					include: [
						path.resolve(__dirname, 'node_modules/dom7'),
						path.resolve(__dirname, 'node_modules/swiper'),
					],
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@babel/preset-env',
									{
										modules: false,
									},
								],
							],
						},
					},
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
						{
							loader: 'postcss-loader',
							options: {
								options: {},
							},
						},
						{
							loader: 'sass-loader',
							options: {
								prependData: `$items: ${data.header.links.length};`,
							},
						},
					],
				},
				{
					test: /\.css$/,
					exclude: /node_modules\/(?!(swiper)\/).*/,
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					exclude: /node_modules/,
					use: [
						'file-loader',
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
