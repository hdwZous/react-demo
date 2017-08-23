/**
 * Created by LQ on 2017/8/14.
 */
import React from 'react';
import {connect} from 'react-redux';
import styles from "./Tab.scss";
import {browserHistory} from 'react-router';
import LocalState from './LocalState';
import {toast} from '../../../components/popup';

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
        let {active, flag, toPage} = this.props;
        return (
            <div>
                <div className={styles.invoiceTab}>
                    <ul>
                        {
                            arr.map((item, key) => {
                                return <li key={key} className={item.key === active ? styles.active : ''}
                                           onClick={() => toPage(item.key, flag)}><span>{item.title}</span></li>
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
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        init: () => {
        },
        toPage: (key, flag) => {
            if (key && flag === 'set') {
                browserHistory.push('/invoice/setinfo/' + key + '/set');
            } else {
                toast('操作失败');
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)