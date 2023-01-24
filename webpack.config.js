const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const path = require('path')

module.exports = {
    target: ["web"],
    entry: './src/scripts.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            { test: /\.css$/, use: ['style-loader', 'css-loader']}
        ]
    },
    devServer: {
        allowedHosts: 'all',
        static: './src',
        hot: true,
        open: true,
        port: "auto"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new Dotenv({
            systemvars: true
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
          })
    ],
    devtool: 'inline-source-map',
    resolve: {
        fallback: {
            "fs": false,
            "os": require.resolve("os-browserify/browser"),
            "path": require.resolve("path-browserify")
          }
    }
}