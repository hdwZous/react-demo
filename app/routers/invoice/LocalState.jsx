/**
 * Created by LQ on 2017/8/15.
 */
import React from 'react';
import {connect} from 'react-redux';
import styles from './LocalState.scss';
import inputInfo from './img/inputInfo.png';
import DefaultAudit from './img/default-audit.png';
import DefaultApproval from './img/default-approval.png';
import ProgressLine from './img/progress-line.png';
import DefaultLine from './img/default-line.png';


const Component = React.createClass({
    componentDidMount () {
        this.props.init()
    },

    render () {
        return (
            <div className={styles.localstate}>
                <ul>
                    <li>
                        <img src={ProgressLine} className={styles.stateLine}/>
                        <img src={inputInfo}/>
                        <span className={styles.currentColor}>录入信息</span>
                    </li>
                    <li>
                        <img src={DefaultLine} className={styles.stateLine}/>
                        <img src={DefaultAudit}/>
                        <span>审核信息</span></li>
                    <li><img src={DefaultApproval}/><span>审核通过</span></li>
                </ul>
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
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)