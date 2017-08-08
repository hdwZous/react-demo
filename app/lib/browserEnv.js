const ua = window.navigator.userAgent

let browserEnv = {

  isInWeixin: function () {
    return /MicroMessenger/i.test(ua)
  },
  isInAndroidApp: function () {
    return /answernAndroid/i.test(ua)
  },
  isInIOSApp: function () {
    return /answernIOS/i.test(ua)
  },
  isInApp: function () {
    return /answernApp/i.test(ua)
  },
  isInAndroid: function () {
    return /android/i.test(ua)
  },
  isInIOS: function () {
    return /iPhone/i.test(ua)
  }
}

export default browserEnv
