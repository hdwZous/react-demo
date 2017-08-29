import React from 'react'
let styles = require('./Button.scss')
import FixedContent from 'fengui/component/page/FixedContent'

class Button extends React.Component {

  render () {
    let {children, disabled, onClick, theme, style, className} = this.props
    return (
      <FixedContent width={750} className={`${styles.btnContainer} ${className}`} style={style}>
        <button className={styles.btn + ' ' + styles[theme]} disabled={disabled} onClick={onClick}>
          {children}
        </button>
      </FixedContent>
    )
  }
}

export default Button
