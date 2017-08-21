/**
 * Created by chaiqing on 2017/7/26.
 */
module.exports = {
    path: 'invoice/',
    childRoutes: [
        {
            path: 'setinfo/:tab/:flag',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('./SetInfo.jsx'))
                })
            }
        }, {
            path: 'sy',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('./Sy.jsx'))
                })
            }
        },
    ],
}