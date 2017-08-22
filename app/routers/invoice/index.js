/**
 * Created by chaiqing on 2017/7/26.
 */
module.exports = {
    path: 'invoice/',
    childRoutes: [
        {
            path: 'setelecinfo/:tab',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('./SetElecInfo.jsx'))
                })
            }
        }, {
            path: 'setnormalinfo',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('./SetNormalInfo.jsx'))
                })
            }
        }, {
            path: 'sy',
            getComponent (nextState, cb) {
              require.ensure([], (require) => {
                cb(null, require('./Sy.jsx'))
              })
            }
          }, {
            path: 'claim',
            getComponent (nextState, cb) {
              require.ensure([], (require) => {
                cb(null, require('./ClaimInvoice.jsx'))
              })
            }
        }
    ]
}