import React from 'react';
import {connect} from 'react-redux';
import styles from "./SetElecInfo.scss";
import Header from './comps/Header';

const Component = React.createClass({
    componentDidMount () {
        this.props.init()
    },

    componentDidUpdate () {
    },

    render () {
        return (
            <div className={styles.this}>
                <Header title="录入普票信息信息"/>
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
