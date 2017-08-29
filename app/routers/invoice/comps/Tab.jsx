/**
 * Created by LQ on 2017/8/14.
 */
import React from 'react';
import {connect} from 'react-redux';
import styles from "./Tab.scss";
import {browserHistory} from 'react-router';
import LocalState from './LocalState';
import {toast, confirm} from '../../../components/popup';
import actions from '../../../redux/actions';
import fromConfig from '../config/from.config';

const Component = React.createClass({
    componentDidMount () {
        this.props.init()
    },

    componentDidUpdate () {
    },

    render () {
        let arr = [{
            key: 'elec',
            title: '电子发票'
        }, {
            key: 'normal',
            title: '普通发票'
        }, {
            key: 'special',
            title: '专用发票'
        }];
        let {active, flag, toPage, invoiceInfo} = this.props;
        return (
            <div>
                <div className={styles.invoiceTab}>
                    <ul>
                        {
                            arr.map((item, key) => {
                                return <li key={key} className={item.key === active ? styles.active : ''}
                                           onClick={() => toPage(item.key, flag, invoiceInfo)}><span>{item.title}</span>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <LocalState flag={flag}/>
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
    let clearRedux = function () {
        fromConfig['special'].map((item) => {
            dispatch(actions.setVars('invoice' + item.id, false));
        });
    };
    return {
        init: () => {
        },
        toPage: (key, flag, info) => {
            if (key && flag === 'set') {
                if (info.isWeatherPerson == '1') {
                    if (key === 'special') {
                        toast('自然人不能开专用发票');
                        return false
                    } else {
                        $('.removeInput').val('');
                        if (key !== 'elec' && (+info.nprice < 300)) {
                            confirm('因您购买的保险产品发票金额小于300元，请考虑索取电子发票。如必须索要纸质发票，需您承担到付快递费用，并向快递员索要快递费发票。由此给您带来的不便，我们深表歉意。')
                        }
                        clearRedux();
                        browserHistory.push('/h5/invoice/setinfo/' + key + '/set');
                        fromConfig && fromConfig[key].map((item) => {
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
                            dispatch(actions.setVars('invoice' + item.id, item));
                        })
                    }
                } else {
                    $('.removeInput').val('');
                    if (key !== 'elec' && (+info.nprice < 300)) {
                        confirm('因您购买的保险产品发票金额小于300元，请考虑索取电子发票。如必须索要纸质发票，需您承担到付快递费用，并向快递员索要快递费发票。由此给您带来的不便，我们深表歉意。')
                    }
                    clearRedux();
                    browserHistory.push('/h5/invoice/setinfo/' + key + '/set');
                    fromConfig && fromConfig[key].map((item) => {
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
                        dispatch(actions.setVars('invoice' + item.id, item));
                    })
                }
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)