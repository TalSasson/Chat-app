import React from 'react'
import injectSheet from 'react-jss'
import checkRTL from '../lib/checkRTL'

const style = {
  messageList: {
    flexGrow: 1,
    background: '#7dc2ad',
    borderRadius: '10px 10px 0 0',
    padding: 20,
  },
  messageWrapper: {
    display: 'flex',
    marginBottom: 40,
  },
  currentUserMsg: {
    flexDirection: 'row-reverse',
  },
  userName: {
    padding: 5,
    borderRadius: 5,
    marginTop: 30,
    background: '#f2818a',
    fontSize: 12,
    maxWidth: 50,
    width: '100%',
    textAlign: 'center',
  },
  msgTimeWrapper: {
    display: 'flex',
    flexGrow: 1,
    position: 'relative',
  },
  content: {
    border: '1px solid #f2818a',
    width: '100%',
    maxWidth: 300,
    borderRadius: '8px 8px 8px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    padding: 10,
    background: 'white',
  },
  currentUserMsgContent: {
    margin: '0 10px 0 0',
    borderRadius: '8px 8px 0 8px',
  },
  rtlDirection: {
    direction: 'rtl',
  },
  time: {
    position: 'absolute',
    bottom: -20,
    left: 8,
    fontSize: 12,
  },
  currentUserMsgTime: {
    right: 8,
    left: 'unset',
  },
}

function MessageList(props) {
  const { classes, messages, chatId } = props

  return (
    <div className={classes.messageList}>
      {!!messages.length && messages.map((msg, index) => {
        const currentUser = chatId === +(msg.userName.slice(-1))
        const lanDirection = checkRTL(msg.content)
        return (
          <div
            className={`${classes.messageWrapper} ${currentUser ? classes.currentUserMsg : ''}`}
            key={index + 1}
          >
            <div className={classes.userName}>
              {msg.userName}
            </div>
            <div className={classes.msgTimeWrapper}>
              <div className={`${classes.content}
            ${currentUser ? classes.currentUserMsgContent : ''}
            ${lanDirection ? classes.rtlDirection : ''}`}
              >
                {msg.content}
              </div>
              <div className={`${classes.time}
            ${currentUser ? classes.currentUserMsgTime : ''}`}
              >
                {msg.time}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default injectSheet(style)(MessageList)
