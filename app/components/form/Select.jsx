import React from 'react'
import styles from './Select.scss'
import FixedContent from 'fengui/component/page/FixedContent'
let _ = require('lodash')
require('jquery.cookie')
import closeimg from './images/gb.png'

let BottomPopup = React.createClass({

  getInitialState () {
    return {
      isShowSelect: false
    }
  },

  showPopup () {
    this.setState({
      isShowSelect: true
    })
  },
  closePopup () {
    this.setState({
      isShowSelect: false
    })
  },

  renderInputBox (text) {
    let {title} = this.props

    return (
      <div className={`${styles.ml20} ${styles.line}`}>
        <div className={styles.text}>{title}</div>
        <div className={styles.choose} onClick={() => this.showPopup()}>
          {text || '请选择'}
        </div>
      </div>
    )
  },

  onClick (selectedValue) {
    let {onSelect} = this.props
    this.closePopup()
    onSelect(selectedValue)
  },
  setHeight (len) {
    return (len > 5 ? 5 : len) * 1.1
  },
  render () {
    let {isShowSelect} = this.state
    let {list, value} = this.props
    let optionMap = _.mapValues(_.indexBy(list, 'value'), obj => obj.text)

    return (
      <FixedContent className={styles.this}>

        {this.renderInputBox(optionMap[value])}

        {isShowSelect &&
        <div className={styles.chooseMask} onClick={() => this.closePopup()} />}

        {isShowSelect &&
        <div className={styles.chooseBox}
          style={{height: this.setHeight(list.length) + 1.1 + 'rem'}}>
          <div className={styles.chooseTop}>
            <div className={styles.titleCenter}>
              {'请选择'}
            </div>
            <span className={styles.chooseTopRight} onClick={() => this.closePopup()}><img src={closeimg} /></span>
          </div>
          <div className={styles.chooseContainer}
            style={{height: this.setHeight(list.length) + 'rem'}}>
            {list.map((n, index) => {
              return (
                <div key={index}
                  className={value === n.value && styles.on}
                  onClick={() => this.onClick(n.value)}
                >{optionMap[n.value]}</div>
              )
            })}
          </div>
        </div>
        }
      </FixedContent>
    )
  }
})
export default BottomPopup

