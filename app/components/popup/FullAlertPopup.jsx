import React from 'react'
import FixedContent from 'fengui/component/page/FixedContent'
import styles from './FullAlertPopup.scss'
import * as actions from 'fengui/redux/actions'
import {dispatch} from 'fengui/redux/store'
import fullAlertImg from './images/full_alert_cancel.png'

const FullAlertPopup = React.createClass({
  propTypes: {
    options: React.PropTypes.object
  },
  getDefaultProps () {
    return {
      options: {}
    }
  },
  closeAlert () {
    dispatch(actions.setVars('fuiFullAlert', ''))
  },
  render () {
    let {message, okText, okClick, title, dangerousHtml} = this.props.options
    return (
      <FixedContent mode='fullWidth' origin='top' className={styles.this}>
        <div className={styles.main}>
          <div className={styles.title}>{title}</div>
          <div className={styles.content}>
            {
              dangerousHtml ? <div dangerouslySetInnerHTML={{__html: dangerousHtml.replace(/\n/g, '<br/>')}} /> : message
            }
          </div>
          <div className={styles.button}>
            <div onClick={okClick}>{okText ? <div style={{paddingTop: '1rem', fontSize: '.36rem'}}>{okText}</div>
              : <img className={styles.closeImg} src={fullAlertImg} />}</div>
          </div>
        </div>
        <div className={styles.toast} onClick={this.closeAlert} />
      </FixedContent>
    )
  }
})

export default FullAlertPopup
