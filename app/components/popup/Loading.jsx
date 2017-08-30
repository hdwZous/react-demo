var _ = require('lodash')
import React from 'react'
import styles from './Loading.scss'

const Loading = React.createClass({
  propTypes: {
    options: React.PropTypes.object
  },
  getDefaultProps () {
    return {
      options: {}
    }
  },

  componentDidMount () {
  },
  componentDidUpdate (preProps) {
  },
  render () {
    let {isShow, loadingText} = this.props.options
    return isShow && (
    <div>
      <div className={styles.this}>
        <div className={styles.mintIndicatorWrapper}>
          {/*<span className={styles.mintIndicatorSpin}>
            <div className={styles.mintSpinnerSnake} />
          </span>*/}
          <div className="spinner">
            <div className="spinner-container container1">
              <div className="circle1"></div>
              <div className="circle2"></div>
              <div className="circle3"></div>
              <div className="circle4"></div>
            </div>
            <div className="spinner-container container2">
              <div className="circle1"></div>
              <div className="circle2"></div>
              <div className="circle3"></div>
              <div className="circle4"></div>
            </div>
            <div className="spinner-container container3">
              <div className="circle1"></div>
              <div className="circle2"></div>
              <div className="circle3"></div>
              <div className="circle4"></div>
            </div>
          </div>
          {loadingText && <span className={styles.mintIndicatorText}>
            {loadingText}
          </span>}
        </div>
        <div className={styles.shade} />
      </div>
    </div>
      )
  }
})

export default Loading
