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

const Component = React.createClass({
    componentDidMount () {
        this.props.init(this.props.tab);
    },

    render () {
        let {bindData, callBack, companyName, companyCode, companyTotal, addAndPhoneNumber, bankNameAndAccount, mobileNumber, messageCode, email, tab, toRegInput} = this.props;
        return (
            <div className={styles.invoiceInput}>
                {/*表单组件*/}
                {
                    fromConfig && fromConfig[tab].map((item, key) => {
                        return <div key={key} style={{backgroundColor: item.color ? item.color : '#fff'}}>
                            {item.icon ? <img src={InputIcon}/> : ''}
                            <span>{item.title}</span>
                            <input type="text" placeholder={item.text ? item.title : '请输入'}
                                   onChange={(e) => bindData(item, e.target.value)}
                                   className={ item.id == 'MessageCode' ? styles.yzmInput : styles.input}/>
                            {item.btn ? <button className={styles.yzmBtn}>点击获取</button> : ''}
                        </div>

                    })
                }
                <div className={styles.submitBtn}>
                    <button onClick={() => toRegInput(callBack, [
                        companyName,
                        companyCode,
                        companyTotal,
                        addAndPhoneNumber,
                        bankNameAndAccount,
                        mobileNumber,
                        messageCode,
                        email
                    ])}>提交
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
        init: (tab) => {
            fromConfig && fromConfig[tab].map((item) => {
                dispatch(actions.setVars('invoice' + item.id, item));
            })
        },
        bindData: (item, value) => {
            item.value = value;
            dispatch(actions.setVars('invoice' + item.id, item));
        },
        toRegInput: (cb, data) => {
            let jsonData = '{';
            data && data.map((item) => {
                if (item) {
                    if (item.reg) {
                        if (item.value) {
                            if (!item.reg.test(item.value)) {
                                toast('请输入正确的' + item.title);
                                return false
                            }
                        } else {
                            toast('请输入正确的' + item.title);
                            return false
                        }
                    }
                    jsonData += '"' + item.id + '":"' + item.value + '"' + ",";
                }
            });
            jsonData = jsonData.substring(0, jsonData.length - 1);
            jsonData += '}';
            cb(JSON.parse(jsonData));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
