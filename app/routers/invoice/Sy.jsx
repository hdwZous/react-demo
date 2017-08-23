import React from 'react';
import {connect} from 'react-redux';
import actions from '../../redux/actions';
const Component = React.createClass({
    componentDidMount () {
    },

    componentDidUpdate () {
    },

    render () {
        const {isActive, change} = this.props
        return (
           <div>
             {
               isActive ? <p>active</p> : <p>not active</p>
             }
             <button onClick={() => change(!isActive)}>点我改变状态</button>
           </div>
        )
    }
})

const mapStateToProps = (state) => {
    return {
      // isActive: state.vars.isActive
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    change: (value) => {
      dispatch(actions.setVars('isActive', value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)