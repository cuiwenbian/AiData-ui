const webpack = require('webpack');

module.exports = {
	assetsDir: 'static',
	publicPath: "./",
	productionSourceMap: false,
	chainWebpack: config => {

		//移除prefetch插件
		config.plugins.delete("prefetch");
		//移除preload插件
		config.plugins.delete("preload");
		//压缩代码
		config.optimization.minimize(true);
		//分割代码
		config.optimization.splitChunks({
			chunks: 'all'
		})
	},

};
// require("babel-polyfill")
