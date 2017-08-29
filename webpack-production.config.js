/**
 * Created by chaiqing on 2017/7/26.
 */
module.exports = require('./webpack-config')({
    devServer: false,
    hotComponents: false,
    longTermCaching: true,
    minimize: true,
    buildPath: 'build/react',
    debug: false,
    localRoute: false,
    pathLink: 'https://weixin.95303.com/h5/public/'
})
