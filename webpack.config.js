const path = require('path');
const webpack = require('webpack');
const data = require(path.resolve(__dirname, 'src/data/main.json'));
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	optimization: {
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: path.resolve(__dirname, 'src/index.pug'),
			filename: path.resolve(__dirname, 'dist/index.html'),
			templateParameters: data,
		}),
		new MiniCssExtractPlugin({
			filename: devMode ? '[name].css' : '[name].[hash].css',
			chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
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
							hmr: devMode,
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
