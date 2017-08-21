/**
 * Created by LQ on 2017/8/15.
 */
import React from 'react';
import {connect} from 'react-redux';
import styles from './InvoiceInput.scss';
import InputIcon from '../img/input-icon.png';
import actions from '../../../redux/actions';
import fromConfig from '../config/from.config';

const aInput = [
    {
        title: '单位名称',
        icon: true,
        id: 'CompanyName'
    },
    {
        title: '纳税人识别号',
        icon: true,
        text: true,
        id: 'CompanyCode'
    },
    {

        title: '价税合计（小写）',
        icon: true,
        color: '#f6f6f6',
        value: true,
        id: 'CompanyTotal',
        text: '1',
    },
    {

        title: '地址、电话',
        icon: false,
        id: 'AddAndPhoneNumber'
    },
    {

        title: '开户行及账号',
        icon: false,
        id: 'BankNameAndAccount'
    },
    {
        title: '手机号',
        icon: true,
        id: 'MobileNumber'
    },
    {
        title: '短信验证码',
        icon: false,
        btn: true,
        id: 'MessageCode'
    },
    {
        title: '邮箱',
        icon: false,
        id: 'Email'
    },
]

const Component = React.createClass({
    componentDidMount () {
        this.props.init()
    },

    render () {
        let {bindData, callBack, companyName, companyCode, companyTotal, addAndPhoneNumber, bankNameAndAccount, mobileNumber, messageCode, email, tab} = this.props;
        return (
            <div className={styles.invoiceInput}>
                {/*表单组件*/}
                {
                    fromConfig && fromConfig[tab].map((item, key) => {
                        return <div key={key} style={{backgroundColor: item.color ? item.color : '#fff'}}>
                            {item.icon ? <img src={InputIcon}/> : ''}
                            <span>{item.title}</span>
                            <input type="text" placeholder={item.text ? item.title : '请输入'}
                                   onChange={(e) => bindData(item.id, e.target.value)}
                                   className={ item.id == 'MessageCode' ? styles.yzmInput : styles.input}/>
                            {item.btn ? <button className={styles.yzmBtn}>点击获取</button> : ''}
                        </div>

                    })
                }
                <div className={styles.submitBtn}>
                    <button onClick={() => callBack({
                        companyName: companyName,
                        companyCode: companyCode,
                        companyTotal: companyTotal,
                        addAndPhoneNumber: addAndPhoneNumber,
                        bankNameAndAccount: bankNameAndAccount,
                        mobileNumber: mobileNumber,
                        messageCode: messageCode,
                        email: email
                    })}>提交
                    </button>
                </div>
            </div>

        )
    }
})

const mapStateToProps = (state) => {
    return {
        companyName: state.vars.invoiceCompanyName,
        companyCode: state.vars.invoiceCompanyCode,
        companyTotal: state.vars.invoiceCompanyTotal,
        addAndPhoneNumber: state.vars.invoiceAddAndPhoneNumber,
        bankNameAndAccount: state.vars.invoiceBankNameAndAccount,
        mobileNumber: state.vars.invoiceMobileNumber,
        messageCode: state.vars.invoiceMessageCode,
        email: state.vars.invoiceEmail
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        init: () => {
        },
        bindData: (id, value) => {
            dispatch(actions.setVars('invoice' + id, value));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
