import React from 'react'
import {connect} from 'react-redux'

const Component = React.createClass({
  componentDidMount () {
    this.props.init()
  },

  componentDidUpdate () {
  },

  render () {
    return (
      <div>
        <h1>标题</h1>
        <h2>副标题</h2>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    init: () => {
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
