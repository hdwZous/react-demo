import React, {Component} from 'react'
import FixedContent from '../../components/common/FixedContent'
import {connect} from 'react-redux'
import actions from '../../redux/actions'
import {SelectInput} from '../../components/form'
import banner from './img/banner.png'
import styles from './ClaimInvoice.scss'
import apiClient from '../../lib/apiClient'
import {browserHistory} from 'react-router'
import inputConfig from './config/input.config'
import {toast, alert, loading} from '../../components/popup'
let ClaimInvoice = React.createClass({
    mixins: [require('mixin/background')('#fff')],
    render () {
        const {
            bindData,
            getTxCode,
            insureNumber,
            insureName,
            cardNumber,
            cardType,
            validate,
            isHidden,
            isCarInsure
        } = this.props
        // console.log(isHidden)
        return (
            <FixedContent>
                <div className={styles.content}>
                    <img src={banner} className={styles.banner}/>
                    {
                        inputConfig.map((item, key) => {
                            return (
                                <div key={key} className={styles.inputGroup}>
                                    {
                                        item.type === 'input' &&
                                        <input placeholder={item.placeHolder}
                                               onChange={(e) => bindData(item, e.target.value)}/>
                                    }
                                    {
                                        item.type === 'select' &&
                                        <SelectInput onSelect={(selectedValue) => bindData(item, selectedValue)}
                                                     title='请选择证件类型'
                                                     name='cardType'
                                                     value={cardType}
                                                     list={[{value: '120001', text: '居民身份证'},
                                                         {value: '100112', text: '统一社会信用代码'},
                                                         {
                                                             value: isCarInsure === 'true' ? '100114' : '100111',
                                                             text: '税务登记证'
                                                         },
                                                         {value: '110001', text: '组织机构代码'},
                                                         {value: '110009', text: '其他'}]}
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
                    }, getTxCode)}>查询
                    </button>
                </div>
                <div className={styles.mask} style={{display: isHidden === 'true' ? 'none' : 'block'}}>
                    <div className={styles.TXCode} id='TXCode'></div>
                </div>
            </FixedContent>
        )
    }
})

const mapStateToProps = (state) => {
    return {
        insureNumber: state.vars.insureNumber,
        insureName: state.vars.insureName,
        cardNumber: state.vars.cardNumber,
        cardType: state.vars.cardType,
        isHidden: state.vars.isHidden,
        isCarInsure: state.vars.isCarInsure,
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
        loading(apiClient.post('/My/Query_invoice', data).then((result) => {
            if (result) {
                let invoiceInfo = result.invoice;
                // let status = invoiceInfo.cstatus === 0 ? 'set' : (invoiceInfo.cstatus === 7 || invoiceInfo.cstatus === 9 ? 'finish' : 'wait')
                let type = invoiceInfo.cinvoiceType === '004' ? 'special' : (invoiceInfo.cinvoiceType === '007' ? 'normal' : 'elec')
                dispatch(actions.setVars('invoiceInfo', invoiceInfo))
                if (invoiceInfo.cinvoiceBS === '03') {
                    alert('我公司为本保险产品提供定额发票，您无需填写发票信息！')
                    /*} else if (invoiceInfo.cinvoiceBS === '02') {
                     console.log('跳转到下一个页面')
                     browserHistory.push('/invoice/setinfo/' + type + '/' + status)*/
                } else {
                    browserHistory.push('/invoice/setinfo/' + type + '/set')
                }
            } else {
                alert('查询信息失败，请稍后再试')
            }
        }), '正在查询，请稍等')
    }
    return {
        init: () => {
            // dispatch(actions.setObjs('values', {cardType: ''}))
        },
        bindData: (item, value) => {
            const isCarInsure = value.substring(9, 11) === '03' ? 'true' : 'false'
            item.value = value
            dispatch(actions.setVars('isCarInsure', isCarInsure))
            dispatch(actions.setVars(item.id, value))
        },
        validate: (data, cb) => {
            let obj = {}
            let flag = true
            for (let item of inputConfig) {
                if (!item.value) {
                    if (item.type === 'select') {
                        toast('请选择' + item.title)
                        flag = false
                        return false
                    } else {
                        toast(item.title + '不能为空')
                        flag = false
                        return false
                    }
                }
                obj[item.id] = data[item.id]
            }
            if (obj.cardType === '120001') {
                const idCardTest = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
                if (!idCardTest.test(obj.cardNumber)) {
                    toast('请输入正确的身份证号')
                    flag = false
                    return false
                }
            }
            if (flag) {
                cb(obj)
            }
        },
        getTxCode: (obj) => {
            dispatch(actions.setVars('isHidden', 'false'))
            loading(apiClient.post('/Sms/Get_slider_captcha_h5').then((result) => {
                if (!$('body').find('script').hasClass('captcha_lib')) {
                    $('body').append(`<script src=${result.jsUrl} class="captcha_lib" id="txcode"></script>`)
                }
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
                        dispatch(actions.setVars('isHidden', 'true'))
                        obj.ticket = retJson.ticket
                        // 用户验证成功
                        doSearch(obj)
                    }
                    else {
                        //用户关闭验证码页面，没有验证
                    }
                }
            }), '请稍候')

        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClaimInvoice)
