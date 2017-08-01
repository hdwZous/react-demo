/**
 * Created by chaiqing on 2017/7/26.
 */
let webpack = require('webpack');
let fs = require('fs');
var path = require('path');
var os = require('os')
var StatsPlugin = require('stats-webpack-plugin');
function getIp() {
    var interfaces = os.networkInterfaces()
    // var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2]
            if (address.family === 'IPv4' && !address.internal) {
                return address.address
            }
        }
    }
    return '127.0.0.1'
}
module.exports = function (options) {
    var excludeFromStats = [
        /node_modules[\\/]react(-router)?[\\/]/,
        /node_modules[\\/]items-store[\\/]/
    ];
    var additionalLoaders = []
    var alias = {}
    var aliasLoader = {}
    var externals = {
        jquery: 'jQuery',
        fastclick: 'FastClick',
        lodash: '_',
        bluebird: 'Promise'
    }
    var modulesDirectories = ['node_modules']
    var extensions = ['', '.web.js', '.js', '.jsx']
    var root = path.join(__dirname, 'app')

    var buildPath = options.buildPath || path.join(__dirname, 'build');
    var publicPath = options.devServer
        ? 'http://' + getIp() + ':1818/answern/'
        : options.pathLink
    var output = {
        path: path.join(buildPath, options.prerender ? 'prerender' : 'public'),
        publicPath: publicPath,
        filename: '[name]' + ((options.longTermCaching && !options.prerender) ? '-[chunkhash]' : '') + '.js',
        chunkFilename: (options.devServer ? '[id]' : '[name]') + (options.longTermCaching && !options.prerender ? '-[chunkhash]' : '') + '.js',
        sourceMapFilename: 'debugging/[file].map',
        libraryTarget: options.prerender ? 'commonjs2' : undefined,
        pathinfo: options.debug || options.prerender
    };

    let loaders = [
        {
            test: /\.(js|jsx)$/,
            use: ['babel-loader', 'react-hot-loader']
        },
        {
            test: /\.css$/,
            use: ['css-loader', 'style-loader']
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
    ]


    plugins.push(new StatsPlugin(path.join(buildPath, 'stats.json'), {
        chunkModules: true,
        exclude: excludeFromStats
    }))

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
    console.log(plugins);
    var webpackConfig = {
        entry: {index: ['./config/reactApp']},
        output: output,
        module: {
            rules: loaders
        },
        devServer: {},
        // debug: options.debug,
        plugins: plugins,
    };
    return webpackConfig;
};
