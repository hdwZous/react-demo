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
import {loading, toast, alert, confirm} from '../../components/popup';
import method from './comps/method';

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
                    flag === 'set' && <InvoiceInput tab={tab} callBack={(data) => getInvoice(invoiceInfo, data)}
                                                    invoiceInfo={invoiceInfo}/>
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
        fuiToast: state.vars.fuiToast,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        init: (invoiceInfo) => {
            if (!invoiceInfo) {
                location.reload();
                browserHistory.replace('/h5/invoice/claim')
            }
            dispatch(actions.setVars('invoiceInfo', invoiceInfo));
            if (invoiceInfo && invoiceInfo.cstatus === '7') {
                browserHistory.replace('/h5/invoice/setinfo/' + ownProps.params.tab + '/finish')
            } else if (invoiceInfo && invoiceInfo.cstatus === '0') {
                // toast('发票正在生成中，请耐心等待30秒后再重新索要发票')
            } else if (invoiceInfo && invoiceInfo.cstatus === '8' || invoiceInfo && invoiceInfo.cstatus === '-1' || invoiceInfo && invoiceInfo.cstatus === '6' || invoiceInfo && invoiceInfo.cstatus === '1' || invoiceInfo && invoiceInfo.cstatus === '2' || invoiceInfo && invoiceInfo.cstatus === '3' || invoiceInfo && invoiceInfo.cstatus === '4') {
                browserHistory.replace('/h5/invoice/setinfo/' + ownProps.params.tab + '/wait')
            } else if (invoiceInfo && invoiceInfo.cstatus !== '0') {
                browserHistory.replace('/h5/invoice/setinfo/' + ownProps.params.tab + '/wait')
            }
        },
        getInvoice: (invoiceInfo, data) => {
            loading(apiClient.post('/My/Issue_invoice', method.getFormatData(invoiceInfo, data, ownProps.params.tab)).then((result) => {
                if(result.cstatus === 8 && ownProps.params.tab === 'elec') {
                    confirm('当前页面提示“自动审核失败，请联系客服人员电话：95303或者发送邮件到4008845678@95303.com进行人工审核！！');
                } else {
                    toast('开票成功');
                }
                browserHistory.push('/h5/invoice/setinfo/' + ownProps.params.tab + '/wait');
            }).catch((e) => {
                toast(e.message);
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
