import React, { useState } from 'react'
import injectSheet from 'react-jss'

const style = {
  inputWrapper: {
    display: 'flex',
  },
  input: {
    padding: '5px 10px',
    flexGrow: 1,
  },
  sendBtn: {
    padding: '0 30px',
  },
}

function Input(props) {
  const [message, setMessage] = useState('')
  const { classes, onSendClick } = props

  function handleBlur(e) {
    const { target: { value } } = e
    setMessage(value)
  }

  return (
    <div className={classes.inputWrapper}>
      <input
        type="text"
        className={classes.input}
        placeholder="Please insert message"
        onBlur={handleBlur}
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
