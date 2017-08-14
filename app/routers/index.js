/**
 * Created by chaiqing on 2017/7/26.
 */
module.exports = {
    name: 'app',
    path: '/',
    childRoutes: [{
        childRoutes: [
            require('./invoice')
        ]
    }]
}
