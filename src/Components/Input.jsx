import React, { useState } from 'react'
import injectSheet from 'react-jss'
import checkRTL from '../lib/checkRTL'
import { THEME } from '../consts'

const style = {
  inputWrapper: {
    display: 'flex',
    height: 40,
  },
  input: {
    padding: '5px 10px',
    flexGrow: 1,
    outline: 'none',
  },
  rtlDirection: {
    direction: 'rtl',
  },
  sendBtn: {
    padding: '0 30px',
    fontWeight: 'bold',
    fontSize: 14,
    background: 'white',
    border: `2px solid ${THEME.secondaryColor}`,
    cursor: 'pointer',
  },
}

function Input(props) {
  const [message, setMessage] = useState('')
  const { classes, onSendClick } = props

  function handleChange(e) {
    const { target: { value } } = e
    setMessage(value)
  }

  function handleKeyPress(e) {
    const { target: { value } } = e
    if (e.charCode === 13) {
      e.preventDefault()
      onSendClick(value)
      setMessage('')
    }
  }

  return (
    <div className={classes.inputWrapper}>
      <input
        type="text"
        value={message}
        className={`${classes.input} ${checkRTL(message) && message ? classes.rtlDirection : ''}`}
        placeholder="Please insert message"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onFocus={() => setMessage('')}
      />
      <button
        className={classes.sendBtn}
        onClick={() => onSendClick(message)}
      >
        Send
      </button>
    </div>
  )
}

export default injectSheet(style)(Input)
