import React from 'react';
import {connect} from 'react-redux';
import Header from './comps/Header';
import Tab from './comps/Tab';
import InvoiceInput from './comps/InvoiceInput';

const Component = React.createClass({
    componentDidMount () {
        this.props.init()
    },

    componentDidUpdate () {
    },

    render () {
        let {tab, flag} = this.props.params;
        return (
            <div>
                <Header title="录入信息"/>
                <Tab active={tab} flag={flag}/>
                <InvoiceInput tab={tab}/>
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
