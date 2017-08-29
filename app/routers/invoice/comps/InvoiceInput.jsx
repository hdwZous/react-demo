/**
 * Created by LQ on 2017/8/15.
 */
import React from 'react';
import {connect} from 'react-redux';
import styles from './InvoiceInput.scss';
import InputIcon from '../img/input-icon.png';
import actions from '../../../redux/actions';
import fromConfig from '../config/from.config';
import {toast} from '../../../components/popup';
import apiClient from '../../../lib/apiClient';
import _ from 'lodash'

const Component = React.createClass({
    componentDidMount () {
        this.props.init(this.props.tab, this.props.invoiceInfo);
    },
    render () {
        let {bindData, callBack, CompanyName, CompanyCode, CompanyTotal, AddAndPhoneNumber, BankNameAndAccount, MobileNumber, MessageCode, Email, tab, toRegInput, sendMessage, SendFlag, invoiceInfo, Username, UserLoaction, sendWord} = this.props;
        return (
            <div className={styles.invoiceInput}>
                {/*表单组件*/}
                {
                    fromConfig && fromConfig[tab].map((item, key) => {
                        if(this.props[item.id]) {
                            if (invoiceInfo && invoiceInfo.isWeatherPerson === '1') {
                                if (item.id !== 'CompanyCode') {
                                    return <div key={key} style={{backgroundColor: item.color ? item.color : '#fff'}}>
                                        {item.icon ? <img src={InputIcon}/> : ''}
                                        <span>{item.title}</span>
                                        <input type="text" placeholder={item.text ? item.title : '请输入'}
                                               onChange={(e) => bindData(item, e.target.value)}
                                               disabled={item.unEdit ? 'disable' : ''}
                                               value={!item.bindData ? this.props[item.id].value : invoiceInfo && (item.id === 'CompanyTotal' ? '¥' + (+invoiceInfo[item.bindData]).toFixed(2) : invoiceInfo[item.bindData])}
                                               className={`${item.id == 'MessageCode' ? styles.yzmInput : ''} ${item.bindData ? '' : 'removeInput'}`}/>
                                        {item.btn ? <button className={styles.yzmBtn}
                                                            onClick={() => sendMessage(MobileNumber, SendFlag)}>{SendFlag ? '请稍后(' + SendFlag + ')' : sendWord}</button> : ''}
                                    </div>
                                }
                            } else {
                                return <div key={key} style={{backgroundColor: item.color ? item.color : '#fff'}}>
                                    {item.icon ? <img src={InputIcon}/> : ''}
                                    <span>{item.title}</span>
                                    <input type="text" placeholder={item.text ? item.title : '请输入'}
                                           onChange={(e) => bindData(item, e.target.value)}
                                           disabled={item.unEdit ? 'disable' : ''}
                                           value={!item.bindData ? this.props[item.id].value : invoiceInfo && (item.id === 'CompanyTotal' ? '¥' + (+invoiceInfo[item.bindData]).toFixed(2) : invoiceInfo[item.bindData])}
                                           className={`${item.id == 'MessageCode' ? styles.yzmInput : ''} ${item.bindData ? '' : 'removeInput'}`}/>
                                    {item.btn ? <button className={styles.yzmBtn}
                                                        onClick={() => sendMessage(MobileNumber, SendFlag)}>{SendFlag ? '请稍后(' + SendFlag + ')' : sendWord}</button> : ''}
                                </div>
                            }
                        }
                    })
                }
                <div className={styles.submitBtn}>
                    <button onClick={() => toRegInput(callBack, [
                        CompanyName,
                        CompanyCode,
                        CompanyTotal,
                        AddAndPhoneNumber,
                        BankNameAndAccount,
                        MobileNumber,
                        MessageCode,
                        Email,
                        UserLoaction,
                        Username
                    ], invoiceInfo)}>提交
                    </button>
                </div>
            </div>
        )
    }
})

const mapStateToProps = (state) => {
    return {
        CompanyName: state.vars.invoiceCompanyName,
        CompanyCode: state.vars.invoiceCompanyCode,
        CompanyTotal: state.vars.invoiceCompanyTotal,
        AddAndPhoneNumber: state.vars.invoiceAddAndPhoneNumber,
        BankNameAndAccount: state.vars.invoiceBankNameAndAccount,
        MobileNumber: state.vars.invoiceMobileNumber,
        MessageCode: state.vars.invoiceMessageCode,
        Email: state.vars.invoiceEmail,
        Username: state.vars.invoiceUsername,
        UserLoaction: state.vars.invoiceUserLoaction,
        CheckFlag: state.vars.invoiceFromCheckFlag,
        SendFlag: state.vars.invoiceSendFlag,
        sendWord: state.vars.invoiceSendWord
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        init: (tab, info) => {
            dispatch(actions.setVars('invoiceSendWord', '点击获取'));
            fromConfig && fromConfig[tab].map((item) => {
                if(info) {
                    if (item.id === 'CompanyName') {
                        item.value = info.cinsuredNme;
                    }
                    if (item.id === 'CompanyTotal') {
                        item.value = info.nprice;
                    }
                    if (item.id === 'MobileNumber') {
                        item.value = info.cmobile;
                    }
                    if (item.id === "CompanyCode" && (info.ccertfCls === '100111' || info.ccertfCls === '100112')) {
                        item.value = info.cbuyDeptCde;
                    }
                }
                dispatch(actions.setVars('invoice' + item.id, item));
            })
        },
        bindData: (item, value) => {
            let cloneItem = _.cloneDeep(item);
            cloneItem.value = value;
            dispatch(actions.setVars('invoice' + item.id, cloneItem));
        },
        toRegInput: (cb, data, invoiceInfo) => {
            let checkFlag = false;
            let jsonData = '{';
            data && data.map((item) => {
                if (item) {
                    if (!item.callNull) {
                        if (item.reg && item.id !== 'CompanyCode') {
                            if (item.value) {
                                if (!item.reg.test(item.value)) {
                                    toast('请输入正确的' + item.title);
                                    checkFlag = true;
                                    return false
                                }
                            } else {
                                toast('请输入正确的' + item.title);
                                checkFlag = true;
                                return false
                            }
                        } else if (item.reg && item.id === 'CompanyCode') {
                            if (invoiceInfo && invoiceInfo.isWeatherPerson === '0') {
                                if (item.value) {
                                    if (!item.reg.test(item.value)) {
                                        toast('请输入正确的' + item.title);
                                        checkFlag = true;
                                        return false
                                    }
                                } else {
                                    toast('请输入正确的' + item.title);
                                    checkFlag = true;
                                    return false
                                }
                            }
                        }
                    } else {
                        if (item.reg && item.value) {
                            if (!item.reg.test(item.value)) {
                                toast('请输入正确的' + item.title);
                                checkFlag = true;
                                return false
                            }
                        }
                    }
                    jsonData += '"' + item.id + '":"' + item.value + '"' + ",";
                }
            });
            jsonData = jsonData.substring(0, jsonData.length - 1);
            jsonData += '}';
            if (!checkFlag) {
                cb(JSON.parse(jsonData));
            }
        },
        sendMessage: (mobileNumber, sendFlag) => {
            if (mobileNumber.value && new RegExp(/^1\d{10}$/).test(mobileNumber.value)) {
                if (!sendFlag || sendFlag === 0) {
                    apiClient.get('/User/Send_tel_identifying', {
                        tel: mobileNumber.value,
                        type: 1
                    });
                    let i = 60;
                    let timmer = setInterval(() => {
                        if (i > 0) {
                            dispatch(actions.setVars('invoiceSendFlag', i--));
                        } else {
                            clearInterval(timmer);
                            dispatch(actions.setVars('invoiceSendWord', '再次获取'));
                            dispatch(actions.setVars('invoiceSendFlag', 0));
                        }
                    }, 1000);
                } else {
                    toast('请稍后！');
                }
            } else {
                toast('请输入手机号码！');
            }
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
