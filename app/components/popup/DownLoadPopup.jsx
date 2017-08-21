import React from 'react'
import FixedContent from 'fengui/component/page/FixedContent'
import styles from './DownLoadPopup.scss'

const Popup = React.createClass({
  propTypes: {
    downLoadPopupObjs: React.PropTypes.object
  },
  render () {
    let {downLoadPopupObjs} = this.props
    return (
      <div>
        <FixedContent className={styles.this}>
          <div className={`${styles.modal}`} />
          <div className={`${styles.popup}`}>
            <div className={styles.dialog}>
              <div className={styles.download} style={{padding: '50px 20px'}}>
                {downLoadPopupObjs.message}
              </div>
              <div className={`${styles.footer} ${styles.downloadApp}`}>
                <div onClick={downLoadPopupObjs.cancelPopup}>{downLoadPopupObjs.cancel}</div>
                <div onClick={downLoadPopupObjs.okPopup}>{downLoadPopupObjs.ok}</div>
              </div>
            </div>
          </div>
        </FixedContent>
      </div>

    )
  }
})

export default Popup
