import React from 'react'
import {Provider} from 'react-redux'
import ReactDom from 'react-dom'

let store = require('../app/redux/store')
import {Router, browserHistory} from 'react-router'

let routes = require('../app/routers')

var FastClick = require('fastclick')

FastClick.attach(document.body)
var win = window

function flex(baseFontSize, fontscale) {
  var _baseFontSize = baseFontSize || 100
  var _fontscale = fontscale || 1

  var doc = win.document
  var ua = navigator.userAgent
  var matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i)
  var UCversion = ua.match(/U3\/((\d+|\.){5,})/i)
  var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80
  var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi)
  var dpr = win.devicePixelRatio || 1
  if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
    dpr = 1
  }
  var scale = 1 / dpr

  var metaEl = doc.querySelector('meta[name="viewport"]')
  if (!metaEl) {
    metaEl = doc.createElement('meta')
    metaEl.setAttribute('name', 'viewport')
    doc.head.appendChild(metaEl)
  }
  metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale)
  doc.documentElement.style.fontSize = _baseFontSize / 2 * dpr * _fontscale + 'px'
};

// flex(100, 1)
ReactDom.render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>
), document.getElementById('react'))
