/**
 * Created by chaiqing on 2017/8/8.
 */
let wx = require('weixin-js-sdk')
// var Promise = require('bluebird')
import apiClient from 'apiClient'
// import browserEnv from 'browserEnv'
// import answernApp from 'answernApp'

function shareInfo (opts) {
  var data = {
    pageUrl: getUrlWithoutHash()
  }
  if (!opts) {
    opts = {
      title: '',
      imgUrl: ''
    }
  }
  opts.title = document.title
  opts.imgUrl = location.origin + '/static/product/img/weixin_share.jpg'

  apiClient.post('/weixin/Share', {
    data
  }).then((result) => {
    if (result.code == 0) {
      result = result.data.body
    }
    var jsApis = [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'previewImage',
      'chooseImage',
      'uploadImage'
    ]
    var wxConfig = {
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: result.appId, // 必填，公众号的唯一标识
      timestamp: result.timestamp, // 必填，生成签名的时间戳
      nonceStr: result.nonceStr, // 必填，生成签名的随机串
      signature: result.signature, // 必填，签名，见附录1
      jsApiList: jsApis // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    }
    wx.config(wxConfig)

    wx.ready(function () {
      wx.onMenuShareTimeline(opts)
      wx.onMenuShareAppMessage(opts)
      wx.onMenuShareQQ(opts)
    })
  })
}

function getUrlWithoutHash () {
  var url = location.href
  if (url.indexOf('#') === -1) {
    return url
  }
  return url.substring(0, url.indexOf('#'))
}

export default shareInfo
