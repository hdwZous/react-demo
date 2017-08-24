import React from 'react';
import {connect} from 'react-redux';
import Header from './comps/Header';
import Tab from './comps/Tab';
import actions from '../../redux/actions';
import InvoiceInput from './comps/InvoiceInput';
import {browserHistory} from 'react-router';
import InvoiceInfo from './comps/InvoiceInfo';
import styles from './SetInfo.scss';
import apiClient from '../../lib/apiClient';

const Component = React.createClass({
    mixins: [require('mixin/background')('#ffffff')],
    componentWillMount () {
        let {init, invoiceInfo} = this.props;
        init(invoiceInfo)
    },

    render () {
        let {invoiceInfo, getInvoice} = this.props;
        let {tab, flag} = this.props.params;
        return (
            <div className={styles.mainBox}>
                <Header title="录入信息"/>
                <Tab active={tab} flag={flag}/>
                {
                    flag === 'set' && <InvoiceInput tab={tab} callBack={(data) => getInvoice(invoiceInfo, data)}/>
                }
                {
                    flag !== 'set' && <InvoiceInfo invoiceInfo={invoiceInfo}/>
                }
            </div>

        )
    }
})

const mapStateToProps = (state) => {
    return {
        invoiceInfo: state.vars.invoiceInfo,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        init: (invoiceInfo) => {
            dispatch(actions.setVars('invoiceInfo', invoiceInfo));
            if (invoiceInfo && invoiceInfo.cstatus === '7') {
                browserHistory.push('/invoice/setinfo/' + ownProps.params.tab + '/finish')
            } else if (invoiceInfo.cstatus === '8') {

            } else if (invoiceInfo && invoiceInfo.cstatus === '-1' || invoiceInfo && invoiceInfo.cstatus === '6' || invoiceInfo && invoiceInfo.cstatus === '1' || invoiceInfo && invoiceInfo.cstatus === '2' || invoiceInfo && invoiceInfo.cstatus === '3' || invoiceInfo && invoiceInfo.cstatus === '4') {
                browserHistory.push('/invoice/setinfo/' + ownProps.params.tab + '/wait')
            } else {
                browserHistory.push('/invoice/claim')
            }
        },
        getInvoice: (invoiceInfo, data) => {
            apiClient.post('/My/Issue_invoice', {
                cplyNo: invoiceInfo.cplyNo,
                cinsuredNme: invoiceInfo.cinsuredNme,
                ccertfCls: invoiceInfo.ccertfCls,
                ccertfCde: invoiceInfo.ccertfCde,
                cappNo: invoiceInfo.cappNo,
                nprm: invoiceInfo.nprm,
                ctrate: invoiceInfo.ctrate,
                nvat: invoiceInfo.nvat,
                nprice: invoiceInfo.nprice,
                cappNme: invoiceInfo.cappNme,//普票必传
                cemail: invoiceInfo.cemail,//非必传
                cmobile: invoiceInfo.cmobile,
                cpostAddress: invoiceInfo.cpostAddress,//邮寄地址
                cinvoiceType: '026' || invoiceInfo.cinvoiceType,//发票类型
                cinvoiceBS: invoiceInfo.cinvoiceBS,
                cbuyDeptCde: invoiceInfo.cbuyDeptCde,
                cchannel: invoiceInfo.cchannel,
                NInvoicePrice: invoiceInfo.NInvoicePrice,//待查看
                CBuyDeptCnm: invoiceInfo.CBuyDeptCnm,
                BankNameAndAccount: invoiceInfo.BankNameAndAccount,
                CprodCnm: invoiceInfo.CprodCnm,
                TPlyCrtTm: invoiceInfo.TPlyCrtTm
            }).then((result) => {
                console.log(result);
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
