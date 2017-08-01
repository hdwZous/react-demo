import React from 'react'
import {Provider} from 'react-redux'
import ReactDom from 'react-dom'

let store = require('../app/redux/store')
import {Router, browserHistory} from 'react-router'
let routes = require('../app/routers')

ReactDom.render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
), document.getElementById('react'))
