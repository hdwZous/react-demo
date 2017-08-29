import React from 'react';
import {connect} from 'react-redux';
import SySelectStyle from './SySelect.scss';
const Component = React.createClass({
    componentDidMount () {
        this.props.init()
    },

    componentDidUpdate () {
    },

    render () {
        return (
            <select name="" id="">
                <option value="" className={SySelectStyle.syxl}></option>
            </select>
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