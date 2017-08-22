/**
 * Created by chaiqing on 2017/7/26.
 */

import BaseApplication from './base/BaseApplication'

module.exports = {
    name: 'app',
    path: '/',
    component: BaseApplication,
    childRoutes: [{
        childRoutes: [
            require('./invoice')
        ]
    }]
}
