import React from 'react';
import {connect} from 'react-redux';
import styles from './InvoiceInfo.scss';
import {browserHistory} from 'react-router';
import actions from '../../../redux/actions';
import FixedContent from '../../../components/common/FixedContent';

const Component = React.createClass({
    componentWillMount () {
        let {init, invoiceInfo} = this.props;
        init(invoiceInfo);
    },

    render () {
        let {invoiceInfo, infoList} = this.props;
        return (
            <FixedContent>
                <div className={styles.mainBox}>
                    <div className={styles.invoiceStatus}>
                        您提交的信息正在审核中，请耐心等待...
                    </div>
                    <div className={styles.detailBox}>
                        {
                            infoList && infoList.map((value, key) => {
                                return (
                                    <div className={styles.item} key={key}>
                                        <div className={styles.title}>{value.title}</div>
                                        <div className={styles.content}>{value.content}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </FixedContent>
        )
    }
})

const mapStateToProps = (state) => {
    return {
        infoList: state.vars.invoiceInfoList,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    let getInfo = function (invoiceInfo) {
        let infoList = [];
        infoList.push({
            title: '单位名称：',
            content: invoiceInfo.cinsuredNme
        });
        infoList.push({
            title: '价税合计（小写）：',
            content: '¥' + (+invoiceInfo.nprice / 100).toFixed(2)
        });
        infoList.push({
            title: '发票号码：',
            content: invoiceInfo.CFphm
        });
        infoList.push({
            title: '发票代码：',
            content: invoiceInfo.CFpdm
        });
        infoList.push({
            title: '手机号：',
            content: invoiceInfo.cmobile
        });
        infoList.push({
            title: '邮箱：',
            content: invoiceInfo.cemail
        });
        return infoList;
    };
    return {
        init: (invoiceInfo) => {
            if (invoiceInfo) {
                console.log(invoiceInfo);
                dispatch(actions.setVars('invoiceInfoList', getInfo(invoiceInfo)));
            } else {
                browserHistory.push('/invoice/claim');
            }
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
