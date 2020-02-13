import React from 'react'
import injectSheet from 'react-jss'
import MessageList from './MessageList'
import Input from './Input'

const style = {
  container: {
    display: 'flex',
    padding: '50px 0',
    flexDirection: 'column',
    flexGrow: 1,
    margin: 10,
  },
}

function Chat(props) {
  const {
    classes, messages, onSendClick, chatId,
  } = props

  return (
    <div className={classes.container}>
      <MessageList messages={messages} chatId={chatId} />
      <Input onSendClick={onSendClick} />
    </div>
  )
}

export default injectSheet(style)(Chat)
