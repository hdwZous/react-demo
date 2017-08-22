import React, {Component} from 'react'
import FixedContent from '../../components/common/FixedContent'
import {connect} from 'react-redux'
import actions from '../../redux/actions'
import {SelectInput} from '../../components/form'
import banner from './img/banner.png'
import styles from './ClaimInvoice.scss'
import apiClient from '../../lib/apiClient'
import {broswerRoute} from 'react-router'
const inputConfig = [
  {
    placeHolder: '请输入保单号',
    id: 'insureNumber',
    type: 'input',
    title: '保单号'
  }, {
    placeHolder: '请输入被保险人姓名',
    id: 'insureName',
    type: 'input',
    title: '保险人姓名'
  }, {
    placeHolder: '请选择证件类型',
    id: 'cardType',
    type: 'select',
    title: '证件类型'
  }, {
    placeHolder: '请输入证件号码',
    id: 'cardNumber',
    type: 'input',
    reg: new RegExp('^[0-9]*$'),
    title: '证件号码'
  }
]
const cardTypeList = [
  {value: '120001', text: '身份证'},
  {value: '120002', text: '护照'},
  {value: '110001', text: '组织机构代码'},
  {value: '100112', text: '统一社会信息代码'},
  {value: '120009', text: '其他'}
]

class ClaimInvoice extends Component {
  componentWillMount () {

  }
  componentDidMount () {

  }
  render () {
    const {
      bindData,
      getTxCode,
      insureNumber,
      insureName,
      cardNumber,
      cardType,
      validate
    } = this.props
    return (
      <FixedContent>
        <div className={styles.content}>
          <img src={banner} className={styles.banner} />
          {
            inputConfig.map((item, key) => {
              return (
                <div key={key} className={styles.inputGroup}>
                  {
                    item.type === 'input' &&
                    <input placeholder={item.placeHolder} onChange={(e) => bindData(item, e.target.value)} />
                  }
                  {
                    item.type === 'select' &&
                    <SelectInput onSelect={(selectedValue) => bindData(item, selectedValue)}
                      title='请选择证件类型'
                      name='cardType'
                      value={cardType}
                      list={cardTypeList}
                    />
                  }
                </div>
              )
            })
          }
          <button className={styles.searchBtn} onClick={() => validate({
            insureNumber,
            insureName,
            cardNumber,
            cardType
          }, getTxCode)} >查询</button>
        </div>
        <div id='TXCode'></div>
      </FixedContent>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    insureNumber: state.vars.insureNumber,
    insureName: state.vars.insureName,
    cardNumber: state.vars.cardNumber,
    cardType: state.vars.cardType
  }
}
/**
 * 跳转到查询成功需要的参数
 * 形式：setinfo/:tab/:flag
 * tab = {elec,normal,special}
 * flag = {set,wait,finish}
 * eg: setinfo/elec/wait
 * 发票信息存储字段名：invoiceInfo
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  let doSearch = (obj) => {
    let data = {
      cplyNo: obj.insureNumber,
      appName: obj.insureName,
      appCertType: obj.cardType,
      appCertCode: obj.cardNumber,
      ticket: obj.ticket
    }
    apiClient.post('/My/Query_invoice', data).then((result) => {
      console.log(result)
      if (!!result && result.code === 0) {
        let invoiceInfo = result.data.invoice
        let status = invoiceInfo.cstatus === 0 ? 'set' : (invoiceInfo.cstatus === 7 || invoiceInfo.cstatus === 9 ? 'finish' : 'wait')
        let type = invoiceInfo.cinvoiceType === '004' ? 'special' : (invoiceInfo.cinvoiceType === '007' ? 'normal' : 'elec')
        dispatch(actions.setVars('invoiceInfo', invoiceInfo))
        if (invoiceInfo.cinvoiceBS === '03') {
          console.log('我公司为本保险产品提供定额发票，您无需填写发票信息！')
        } else if (invoiceInfo.cinvoiceBS === '02') {
          broswerRoute.push('setinfo/' + type + '/' + status)
        }
      }
    })
  }
  return {
    init: () => {
      // dispatch(actions.setObjs('values', {cardType: ''}))
    },
    bindData: (item, value) => {
      item.value = value
      dispatch(actions.setVars(item.id, value))
    },
    validate: (data, cb) => {
      let obj = {}
      let flag = true
      inputConfig.map((item) => {
        if (!item.value) {
          if (item.type === 'select'){
            console.log('请选择' + item.title)
          } else {
            console.log(item.title + '不能为空')
          }
          flag = false
        }
        obj[item.id] = data[item.id]
      })
      if (obj.cardType === '120001'){
        const idCardTest = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
        if (!idCardTest.test(obj.cardNumber)) {
          console.log('请输入正确的身份证号')
          flag = false
          return false
        }
      }
      if (flag) {
        cb(obj)
      }
    },
    getTxCode: (obj) => {
      apiClient.post('/Sms/Get_slider_captcha_h5').then((result) => {
        $('body').append(`<script src=${result.jsUrl} class="captcha_lib" id="txcode"></script>`)
        // $('body').append('<script src="' + result.jsUrl + '" class="captcha_lib" id="txcode"><\/script>');
        let timer = setInterval(() => {
          if (capInit) {
            clearInterval(timer)
            let capOption = {callback: cbfn, showHeader: false}
            capInit(document.getElementById('TXCode'), capOption)
          }
        }, 100)
        //回调函数：验证码页面关闭时回调
        function cbfn(retJson) {
          if (retJson.ret === 0) {
            obj.ticket = retJson.ticket
            // 用户验证成功
            doSearch(obj)
          }
          else {
            //用户关闭验证码页面，没有验证
          }
        }
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClaimInvoice)
