/**
 * Created by LQ on 2017/8/15.
 */
import React from 'react';
import {connect} from 'react-redux';
import styles from './LocalState.scss'
import inputInfo from './img/inputInfo.png';
import DefaultAudit from './img/default-audit.png';
import DefaultApproval from './img/default-approval.png';


const Component = React.createClass({
    componentDidMount () {
        this.props.init()
    },

    render () {
        return (
            <div className={styles.LocalState}>
                <ul>
                    <li><img src={inputInfo}/></li>
                        <li><img src={DefaultAudit}/></li>
                            <li><img src={DefaultApproval}/></li>
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