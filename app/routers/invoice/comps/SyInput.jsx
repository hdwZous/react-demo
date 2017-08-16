import React from 'react';
import {connect} from 'react-redux';
import SyInputStyle from './SyInput.scss';
const Component = React.createClass({
    componentDidMount () {
        this.props.init()
    },

    componentDidUpdate () {
    },

    render () {
        return (
            <input className={SyInputStyle.ptinput} type="text" placeholder={this.props.placeholder} />
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