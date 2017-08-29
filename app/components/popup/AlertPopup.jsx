import React from 'react'
import FixedContent from 'fengui/component/page/FixedContent'
import styles from './AlertPopup.scss'
import * as actions from 'fengui/redux/actions'
import {dispatch} from 'fengui/redux/store'

const Component = React.createClass({
  propTypes: {
    options: React.PropTypes.object
  },
  getDefaultProps () {
    return {
      options: {}
    }
  },
  closeAlert () {
    dispatch(actions.setVars('fuiAlert', ''))
  },
  render () {
    let {message, okText, okClick, cancelText, cancelClick, title, isModal = true, dangerousHtml} = this.props.options
    return (
      <FixedContent mode='fullWidth' origin='top' className={styles.this}>
        <div className={styles.main}>
          <div className={styles.title}>{title}</div>
          <div className={styles.content} style={{marginTop: !title && '.6rem'}}>
            {
              dangerousHtml ? <div dangerouslySetInnerHTML={{__html: dangerousHtml}} /> : message
            }
          </div>
          <div className={styles.button}>
            {cancelText &&
            <div onClick={cancelClick}
              className={styles.cancel}>{cancelText}<i /></div>}
            <div onClick={okClick}>{okText}</div>
          </div>
        </div>
        {isModal && <div className={styles.toast} onClick={cancelClick} />}
        {!isModal && <div className={styles.toast} onClick={this.closeAlert} />}
      </FixedContent>
    )
  }
})

export default Component
