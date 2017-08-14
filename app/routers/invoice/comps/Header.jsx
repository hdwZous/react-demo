import React from 'react';
import {connect} from 'react-redux';
import styles from "./Header.scss";
import backIcon from '../img/back.png';
import answernApp from '../../../lib/answernApp';
import browserEnv from '../../../lib/browserEnv';

const Component = React.createClass({
    componentDidMount () {
        this.props.init()
    },

    render () {
        let {title, back} = this.props;
        return (
            <div className={styles.header}>
                <img src={backIcon} onClick={() => back()}/>
                {title}
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
        back: () => {
            if (browserEnv.isInApp()) {
                answernApp.back();
            } else {
                window.history.back();
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
