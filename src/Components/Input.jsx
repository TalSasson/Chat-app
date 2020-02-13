import React, { useState } from 'react'
import injectSheet from 'react-jss'

const style = {
  inputWrapper: {
    display: 'flex',
    height: 40,
  },
  input: {
    padding: '5px 10px',
    flexGrow: 1,
  },
  sendBtn: {
    padding: '0 30px',
    fontWeight: 'bold',
    fontSize: 14,
    background: 'white',
    border: '2px solid #f2818a',
    cursor: 'pointer',
  },
}

function Input(props) {
  const [message, setMessage] = useState('')
  const { classes, onSendClick } = props

  function handleBlur(e) {
    const { target: { value } } = e
    setMessage(value)
  }

  function handleKeyPress(e) {
    const { target: { value } } = e
    if (e.charCode === 13) {
      e.preventDefault()
      onSendClick(value)
    }
  }

  return (
    <div className={classes.inputWrapper}>
      <input
        type="text"
        className={classes.input}
        placeholder="Please insert message"
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
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
