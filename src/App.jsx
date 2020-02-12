import React from 'react'
import injectSheet from 'react-jss'

const style = {
  appContainer: {
    fontFamily: 'sans-serif',
    width: '100%',
    height: '100vh',
    boxSizing: 'border-box',
  },
}

function App(props) {
  const { classes } = props
  return (
    <div className={classes.appContainer}>

    </div>
  )
}

export default injectSheet(style)(App)
