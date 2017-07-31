import React from 'react'
import {connect} from 'react-redux'


const Component = React.createClass({
    componentDidMount () {
        this.props.init();
    },

    componentDidUpdate(){
    },

    render () {
        return (
            <div>Hello world</div>
        )
    },
});

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        init: () => {
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
