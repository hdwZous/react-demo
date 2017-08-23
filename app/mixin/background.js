var $ = require('jquery')

module.exports = function (background) {
  let $body = $('body')
  return {
    componentWillMount: function () {
      this.originBodyColor = $body.css('background')
      $body.css('background', background)
    },

    componentWillUnmount: function () {
      $body.css('background', this.originBodyColor)
    }
  }
}
