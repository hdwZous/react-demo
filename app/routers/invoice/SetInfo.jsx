import React from 'react';
import {connect} from 'react-redux';
import Header from './comps/Header';
import Tab from './comps/Tab';
import actions from '../../redux/actions';
import InvoiceInput from './comps/InvoiceInput';
import {browserHistory} from 'react-router';
import InvoiceInfo from './comps/InvoiceInfo';
import styles from './SetInfo.scss';

const Component = React.createClass({
    mixins: [require('mixin/background')('#ffffff')],
    componentDidMount () {
        this.props.init()
    },

    render () {
        let {invoiceInfo} = this.props;
        let {tab, flag} = this.props.params;
        return (
            <div className={styles.mainBox}>
                <Header title="录入信息"/>
                <Tab active={tab} flag={flag}/>
                {
                    flag === 'set' && <InvoiceInput tab={tab} callBack={(data) => {
                        console.log(data);
                    }}/>
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
        init: () => {
            let invoiceInfo = {
                "cplyNo": "1010057080015170000000024",
                "cinsuredNme": "李四",
                "ccertfCde": "142335199203136188",
                "ccertfCls": "120001",
                "cappNo": "0010057080015170000000024",
                "nprm": "50.0",
                "ctrate": "6%",
                "nvat": "2.83",
                "nprice": "47.17",
                "cappNme": "张三",
                "cemail": "897284747@qq.com",
                "cmobile": "13264162395",
                "cstatus": "7",
                "cpostAddress": "sss",
                "cinvoiceType": "026",
                "cinvoiceBS": "02",
                "cbuyDeptCde": "142335199403186288",
                "cbuyDeptAdr": "13387565678",
                "cchannel": "06",
                "isExist": "true",
                "NInvoicePrice": "0",
                "CBuyDeptBank": "600072333333333333333",
                "TPlyCrtTm": "Thu Aug 17 00:00:00 CST 2017",
                "CprodCnm": "家财通用保险",
                "EInvoiceURL": "http://dzdzwxcs1.ciitc.com.cn/s/FdcHJBJK",
                "CFphm": "91020932",
                "CFpdm": "050003523457",
                "isWeatherPerson": "1",
                "appcerentType": "120001"
            }
            dispatch(actions.setVars('invoiceInfo', invoiceInfo));
            if (invoiceInfo.cstatus !== '1') {
                browserHistory.push('/invoice/setinfo/' + ownProps.params.tab + '/finish')
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
