import React from 'react'
import {connect} from 'react-redux'
import {AlertPopup, Toast, Loading} from '../../components/popup';
// import Loading from 'fengui/component/popup/Loading';
import actions from '../../redux/actions';
let {dispatch} = require('../../redux/store');

require('./BaseApplication.gscss')

class Application extends React.Component {
    constructor(props) {
        super(props)
        dispatch(actions.setVars('landingUrl', location.href))
    }

    render() {
        let {fuiAlert, fuiToast, fuiLoading} = this.props;
        return (
            <div className={'noSelect'}>
                {this.props.children}
                {fuiAlert && <AlertPopup options={fuiAlert}/>}
                {fuiToast && <Toast options={fuiToast}/>}
                {fuiLoading && <Loading options={fuiLoading}/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fuiAlert: state.vars.fuiAlert,
        fuiToast: state.vars.fuiToast,
        fuiLoading: state.vars.fuiLoading,
    }
}

export default connect(mapStateToProps)(Application)
