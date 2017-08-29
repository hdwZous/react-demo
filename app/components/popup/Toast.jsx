import React from 'react'
import {connect} from 'react-redux'
import FixedContent from 'fengui/component/page/FixedContent'
import styles from './Toast.scss'
import * as actions from 'fengui/redux/actions'

const Home = React.createClass({
    propTypes: {
        options: React.PropTypes.object
    },
    getDefaultProps () {
        return {
            options: {}
        }
    },
    componentDidMount () {
        let {time} = this.props.options
        this.props.init(time)
    },
    render () {
        let {toastValue} = this.props.options
        return toastValue && (
                <FixedContent className={styles.this}>
                    <div className={`${styles.promptBox} ${styles.bounce} `}>
                        <p>{toastValue}</p>
                    </div>
                </FixedContent>
            )
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        init: (time) => {
            setTimeout(() => {
                dispatch(actions.setVars('fuiToast', ''))
            }, time)
        }
    }
}
export default connect(null, mapDispatchToProps)(Home)
