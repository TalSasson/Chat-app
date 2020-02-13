import React, { useState } from 'react'
import injectSheet from 'react-jss'
import Chat from './Components/Chat'

const style = {
  appContainer: {
    fontFamily: 'sans-serif',
    display: 'flex',
    width: '100%',
    height: '100vh',
    boxSizing: 'border-box',
  },
}

const NUMBER_OF_USERS = 2

function App(props) {
  const [messages, setMessages] = useState([])

  const { classes } = props

  function handleClick(message, userId) {
    const hours = new Date().getHours().toString()
    const min = new Date().getMinutes().toString()
    const time = `${hours.padStart(2, '0')}:${min.padStart(2, '0')}`
    const newMessage = {
      content: message,
      userName: `User-${userId}`,
      time,
    }
    const newMessages = [...messages, newMessage]
    setMessages(newMessages)
  }

  return (
    <div className={classes.appContainer}>
      {[...Array(NUMBER_OF_USERS)].map((item, index) => (
        <Chat
          messages={messages}
          key={`user-${index + 1}`}
          chatId={index + 1}
          onSendClick={(message) => handleClick(message, index + 1)}
        />
      ))}
    </div>
  )
}

export default injectSheet(style)(App)
