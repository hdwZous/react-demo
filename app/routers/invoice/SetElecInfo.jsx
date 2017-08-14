import React from 'react';
import {connect} from 'react-redux';
import styles from "./SetElecInfo.scss";
import Header from './comps/Header';
import Tab from './Tab';
import SetNormalInfo from './SetNormalInfo';

const Component = React.createClass({
    componentDidMount () {
        this.props.init()
    },

    componentDidUpdate () {
    },

    render () {
        let {tab} = this.props.params;
        return (
            <div className={styles.this}>
                <Header title="录入信息"/>
                <Tab active={tab}/>
                {
                    tab === 'pt' && <SetNormalInfo/>
                }
                {
                    tab === 'elec' && <SetNormalInfo/>
                }
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
