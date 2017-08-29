module.exports = [
    require('./webpack-config')({
        longTermCaching: true,
        minimize: true,
        buildPath: 'build/react',
        pathLink: 'http://uat.95303.com/h5/public/'
    })
]
