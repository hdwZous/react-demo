import React from 'react'
import FixedContent from 'fengui/component/page/FixedContent'
import styles from './Input.scss'
import cancelImg from './images/cancel1.png'

let Input = React.createClass({
  getInitialState () {
    return {
      focusInputName: '',
      removeCloseBtnTimer: null
    }
  },
  formValueChange (name, len, event) {
    let {onChange} = this.props
    var value = event.target.value
    if (value.length > len) {
      return false
    }
    onChange(name, value)
  },
  cancelFn (name) {
    let {onChange} = this.props
    onChange(name, '')
  },
  removeCloseBtn () {
    this.setState({
      removeCloseBtnTimer: setTimeout(() => {
        this.setState({
          focusInputName: ''
        })
      }, 300)
    })
  },
  setFocusInputName (name) {
    let {removeCloseBtnTimer} = this.state
    clearTimeout(removeCloseBtnTimer)
    this.setState({
      focusInputName: name
    })
  },
  componentDidMount () {
    if (this.props.autoFocus) {
      this.refs.inputRef.focus()
    }
  },
  formInput () {
    let {focusInputName} = this.state
    let {placeholder, name, disabled, maxlen, type, value, onFocus, onBlur} = this.props
    return <div className={styles.input}>
      <input ref='inputRef' className={styles.write}
        placeholder={placeholder}
        type={type || 'text'}
        disabled={disabled}
        value={value || ''}
        onBlur={(event) => { this.removeCloseBtn(name); onBlur && onBlur(event) }}
        onFocus={(event) => { this.setFocusInputName(name); onFocus && onFocus(event) }}
        onChange={this.formValueChange.bind(this, name, maxlen)}

      />

      {value && (focusInputName === name) ? <img onClick={() => this.cancelFn(name)} className={styles.cancel} src={cancelImg} /> : <span className={styles.cancel}>&nbsp;</span>
      }

      {this.props.children}
    </div>
  },
  listInput () {
    let {focusInputName} = this.state
    let {title, placeholder, name, disabled, maxlen, type, value} = this.props
    return <div className={`${styles.ml20} ${styles.line}`}>
      <div className={styles.text}>{title}</div>

      <input ref='inputRef' className={styles.write}
        placeholder={placeholder}
        type={type || 'text'}
        disabled={disabled}
        onBlur={() => this.removeCloseBtn(name)}
        onFocus={() => this.setFocusInputName(name)}
        value={value || ''}
        onChange={this.formValueChange.bind(this, name, maxlen)}
      />
      {value && (focusInputName === name) &&
      <span onClick={() => this.cancelFn(name)} className={styles.cancel}><img
        src={cancelImg} /></span>}
    </div>
  },
  render () {
    let {theme, error, style} = this.props
    if (theme === 'form') {
      return <FixedContent className={`${styles.formInput} ${error && styles.error}`} style={style}>
        {this.formInput()}
      </FixedContent>
    } else if (theme !== 'form') {
      return <FixedContent className={styles.this}>
        {this.listInput()}
      </FixedContent>
    }
  }
})
export default Input
