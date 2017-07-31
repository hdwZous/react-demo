/**
 * Created by chaiqing on 2017/7/26.
 */
module.exports = {
    path: 'product/',
    childRoutes: [
        {
            path: 'home',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('./Home'))
                })
            }
        },
    ],
}