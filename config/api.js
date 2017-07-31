'use strict'

var fs = require('fs')
var request = require('request')
var config = require('config')
var multipart = require('connect-multiparty')
var _ = require('lodash')

var proxy = function (toBaseUrl) {
  return function (req, res) {
    var url = toBaseUrl + req.path
    var opts = {
      followRedirect: false,
      url: url,
      qs: req.query,
      method: req.method,
      headers: {
        cookie: req.get('cookie')
      }
    }

    var contentType = req.get('content-type')

    if (contentType) {
      if (contentType.indexOf('application/json') > -1) {
        opts.json = req.body
      }
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        opts.form = req.body
      }
      if (contentType.indexOf('multipart/form-data') > -1) {
        opts.formData = _.mapValues(req.files, file => fs.createReadStream(file.path))
      }
    }

    request(opts).on('error', function (err) {
      console.error(err)
    }).pipe(res)
  }
}

module.exports = function (app) {
    app.use('/api', multipart(), proxy(config.serviceBaseUrl))//开发环境
}
