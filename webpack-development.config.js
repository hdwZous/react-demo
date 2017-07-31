module.exports = [
    require('./webpack-config')({
        longTermCaching: true,
        minimize: true,
        buildPath: 'build/react',
        pathLink: 'http://uatm.95303.com/react/public/'
    })
]
