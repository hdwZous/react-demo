/**
 * Created by chaiqing on 2017/7/26.
 */
let webpack = require('webpack');
let fs = require('fs');
var path = require('path');
var StatsPlugin = require('stats-webpack-plugin');
module.exports = function (options) {

    let loaders = [
        {
            test: /\.(js|jsx)$/,
            use: 'babel-loader'
        },
        {
            test: /\.css$/,
            use: ['css-loader','style-loader']
        },
        {
             test: /\.(png|svg|jpg|gif)$/,
             use: 'file-loader?limit=10'
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: 'file-loader?limit=100000'
        }
    ];
        /*'jsx': options.hotComponents ? ['react-hot-loader', 'babel-loader?stage=0'] : 'babel-loader?stage=0',
        'js': {
            loader: 'babel-loader?stage=0',
            include: [
                path.join(__dirname, 'app'),
                // fs.realpathSync(path.join(__dirname, 'node_modules/fengui'))
            ]
        },*/
        /*'coffee': 'coffee-redux-loader',
        'json5': 'json5-loader',
        'txt': 'raw-loader',
        'png|jpg|jpeg|gif|svg': 'url-loader?limit=10',
        'woff|woff2': 'url-loader?limit=100000',
        'ttf|eot': 'file-loader',
        'wav|mp3': 'file-loader',*/
        // 'html': 'html-loader',
        // 'md|markdown': ['html-loader', 'markdown-loader']

    var plugins = [
        new webpack.PrefetchPlugin('react'),
        new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment')

    ]

    if (options.minimize) {
        plugins.push(
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new webpack.NoErrorsPlugin()
        )
    }

    plugins.push(new StatsPlugin(path.join(__dirname, 'stats.json'), {
        chunkModules: true,
        // exclude: excludeFromStats
    }))

    let webpackConfig = {
        entry: './app/routers/index',
        output: {
            filename: 'common'
        },
        module: {
            rules: loaders
        },
        devServer: {},
        // debug: options.debug,
        plugins: [],
    };
    return webpackConfig;
};
