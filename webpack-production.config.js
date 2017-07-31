/**
 * Created by chaiqing on 2017/7/26.
 */
module.exports = require('./webpack-config')({
    devServer: true,
    hotComponents: true,
    devtool: 'eval',
    debug: true,
    localRoute: true
})
