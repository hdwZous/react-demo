import React from 'react';
import {connect} from 'react-redux';
import banner from './img/banner.png';
import SyInput1 from './comps/SyInput.jsx';
import SyInput2 from './comps/SyInput.jsx';
import SyInput4 from './comps/SyInput.jsx';
import SySelect from './comps/SySelect';
import SySearch from './comps/SySearch.jsx';
import styles from './Sy.scss';
const Component = React.createClass({
    componentDidMount () {
        this.props.init()
    },

    componentDidUpdate () {
    },

    render () {
        return (
            <div className={'sy-container'}>
                <div className={styles.a}><img className={styles.img} src={banner} /></div>
                <SyInput1 placeholder='请输入保单号' />
                <SyInput2 placeholder='请输入被保险人姓名' />
                <SySelect placeholder="请选择证件类型"/>
                <SyInput4 placeholder='请输入证件号码' />
                <SySearch />
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