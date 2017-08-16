import React from 'react';
import {connect} from 'react-redux';
import banner from './img/banner.png';
import SyInput1 from './comps/SyInput.jsx';
import SyInput2 from './comps/SyInput.jsx';
import SyInput4 from './comps/SyInput.jsx';
import SySelect from './comps/SySelect';
import {Select} from "../../components/form";
import SySearch from './comps/SySearch.jsx';
import actions from '../../redux/actions';
import styles from './Sy.scss';
const Component = React.createClass({
    componentDidMount () {
        this.props.init()
    },

    componentDidUpdate () {
    },

    render () {
        let {selectEvent, form}=this.props;
        return (
            <div className={'sy-container'}>
                <div className={styles.a}><img className={styles.img} src={banner}/></div>
                <SyInput1 placeholder='请输入保单号'/>
                <SyInput2 placeholder='请输入被保险人姓名'/>
                <SySelect placeholder="请选择证件类型"/>
                <Select onSelect={(selectedValue) => selectEvent('sex', selectedValue)}
                        title="性别"
                        name="sex"
                        value={form.sex}
                        list={[{value: 'male', text: '男'}, {value: 'female', text: '女'}]}/>
                <SyInput4 placeholder='请输入证件号码'/>
                <SySearch />
            </div>
        )
    }
})

const mapStateToProps = (state) => {
    return {
        form: state.objs.form || {},
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        init: () => {
            dispatch(actions.setObjs('form', {sex: 'male'}));
        },
        selectEvent: (name, selectedValue) => {
            dispatch(actions.appendObjs('form', name, selectedValue));
            console.log('selectedValue', selectedValue);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)