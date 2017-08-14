/**
 * Created by LQ on 2017/8/14.
 */
import React from 'react';
import {connect} from 'react-redux';
import styles from "./Tab.scss";
import {browserHistory} from 'react-router';

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
            key: 'pt',
            title: '普通发票'
        }, {
            key: 'zy',
            title: '专用发票'
        }];
        let {active} = this.props;
        console.log(active);
        return (
            <ul>
                {
                    arr.map((item, key) => {
                        return <li key={key} className={item.key === active ? styles.active : ''} onClick={() => {
                            browserHistory.push('/invoice/setelecinfo/' + item.key)
                        }}>{item.title}</li>
                    })
                }
            </ul>
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
        tabLight: (text) => {

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)