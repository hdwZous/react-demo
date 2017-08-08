/**
 * Created by chaiqing on 2017/8/8.
 */
import Jockey from 'jockey'

let AnswernApp = {
  navButtons: function (arrayObj) { // 右上角分享、客服、ocr
    Jockey.send('answern', {key: 'navButtons', data: arrayObj})
  },
  share: function (share) {
    Jockey.send('answern', {key: 'share', data: share})
  },
  ocr: function (ocr) {
    Jockey.send('answern', {key: 'ocr'})
  },
  login: function () { // 登录
    Jockey.send('answern', {key: 'login'})
  },
  date: function () { // 显示原生时间空间
    Jockey.send('answern', {key: 'date'})
  },
  location: function () { // 获取位置
    Jockey.send('answern', {key: 'location'})
  },
  image: function () {
    Jockey.send('answern', {key: 'image'})
  },
  toNativePage: function (page) {
    location.href = page
  },
  wxAuth: function () {
    Jockey.send('answern', {key: 'wxAuth'})
  },
  hideNav: function (statusBarColor) {
    Jockey.send('answern', {key: 'hideNav', statusBarColor: statusBarColor})
  },
  back: function (type) {
    Jockey.send('answern', {key: 'back', type: type + ''})
  }
}

export default AnswernApp
