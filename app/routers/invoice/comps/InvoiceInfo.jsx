import React from 'react';
import {connect} from 'react-redux';
import styles from './InvoiceInfo.scss';
import {browserHistory} from 'react-router';
import actions from '../../../redux/actions';
import FixedContent from '../../../components/common/FixedContent';
import iconPhone from '../img/phone.png';
import method from './method';

const Component = React.createClass({
    componentWillMount () {
        let {init, invoiceInfo} = this.props;
        init(invoiceInfo);
    },

    render () {
        let {infoList, changeMaskShow, maskShowFlag, messageFlag, invoiceInfo} = this.props;
        return (
            <FixedContent>
                <div className={styles.mainBox}>
                    <div className={styles.invoiceStatus}>
                        {
                            messageFlag && method.getMessage[messageFlag]
                        }
                        {
                            messageFlag === 2 && <span className={styles.downLoadInovice} onClick={() => {
                                location.href = invoiceInfo.EInvoiceURL
                            }}>立即打印</span>
                        }
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
                    <img src={iconPhone} className={styles.iconPhone} onClick={() => changeMaskShow(maskShowFlag)}/>
                    {
                        maskShowFlag && <div className={styles.butnMask} onClick={() => changeMaskShow(maskShowFlag)}/>
                    }
                    {
                        maskShowFlag && <div className={styles.butnList}>
                            <a className={styles.butn} href='tel:95303'>呼叫</a>
                            <div className={styles.arrow}/>
                        </div>
                    }
                </div>
            </FixedContent>
        )
    }
})

const mapStateToProps = (state) => {
    return {
        infoList: state.vars.invoiceInfoList,
        maskShowFlag: state.vars.invoiceCallMaskShowFlag,
        messageFlag: state.vars.invoiceMessageFlag
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        init: (invoiceInfo) => {
            if (invoiceInfo) {
                dispatch(actions.setVars('invoiceMessageFlag', method.checkMessageStaus(invoiceInfo.cstatus)))
                dispatch(actions.setVars('invoiceInfoList', method.getInfo(invoiceInfo)));
            } else {
                browserHistory.push('/h5/invoice/claim');
            }
        },
        changeMaskShow: (flag) => {
            dispatch(actions.setVars('invoiceCallMaskShowFlag', !flag));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
