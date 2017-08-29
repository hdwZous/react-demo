import React from 'react'
let styles = require('./Button.scss')
import FixedContent from 'fengui/component/page/FixedContent'

class BtnGroup extends React.Component {

  render() {
    let {children, className, style} = this.props
    if (!Array.isArray(children)) {
      children = [children]
    }
    children = children.filter(btn => !!btn.props)

    return (
      <FixedContent width={750} className={`${styles.btnGroup} ${className || ''}`} style={style}>
        {children.map(function (btn, i) {
          return (
            <div key={i} className={btn.props.disabled && styles.disabled} style={{width: 100 / children.length + '%'}}>
              {btn}
            </div>
          )
        })}
      </FixedContent>
    )
  }
}
export default BtnGroup
