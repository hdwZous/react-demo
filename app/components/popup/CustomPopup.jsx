import React from 'react'
import styles from './CustomPopup.scss'
const CustomPopup = React.createClass({
  propTypes: {
    options: React.PropTypes.object

  },
  getDefaultProps () {
    return {
      options: {}
    }
  },
  render () {
    let {style, onBackdrop, children, top} = this.props

    return (
      <div className={styles.this}>
        <div onClick={onBackdrop || ''} className={styles.fixedBox} />
        <div className={styles.fixed} style={{
          top: '20%',
          width: '90%',
          left: '5%',
          zIndex: 99,
          ...style
        }}>
          {children}
        </div>
      </div>
    )
  }
})
export default CustomPopup
