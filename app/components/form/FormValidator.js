import _ from 'lodash'
import moment from 'moment'

let validateType = {
  'zh_cn': /^[\u4e00-\u9fa5]*$/,
  'number': /^\d*$/,
  'en_us': /^[a-zA-Z]*$/,
  'idCard': /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
  'mobile': /^1[4|3|5|7|8][0-9]{9}$/,
  'required': /^.+$/,
  'moment': 'moment'
}

class FormValidator {

  constructor (rules) {
    this.rules = rules
    this.error = {}
  }

  clearError () {
    this.error = {}
  }

  validate (values, key, exclude = []) {
    let error = this.error
    let rules = this.rules
    let check = (key) => {
      let rule = rules[key]
      if (rule) {
        if (rule instanceof Array) {
          for (let index in rule) {
            valid(rule[index], key)
            if (error[key]) {
              break
            }
          }
        } else {
          valid(rule, key)
        }
      }
    }
    let valid = function (rule, key) {
      let {type, message, regex} = rule
      let reg = regex || validateType[type]
      if (reg === 'moment') {
        if (values[key] && !(values[key] instanceof moment)) {
          error[key] = message
        } else {
          delete error[key]
        }
      } else {
        let test = reg.test(values[key] || '')
        if (!test) {
          error[key] = message
        } else {
          delete error[key]
        }
      }
    }
    if (key) {
      check(key)
    } else {
      for (let key in rules) {
        _.indexOf(exclude, key)
        if (_.indexOf(exclude, key) === -1) {
          check(key)
        }
      }
    }
    if (exclude && exclude.length > 0) {
      error = _.omit(error, exclude)
    }
    return error
  }
}

export default FormValidator
