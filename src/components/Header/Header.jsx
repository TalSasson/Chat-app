import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles, useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import AppsIcon from '@material-ui/icons/Apps'
import { connect } from 'react-redux'
import { compose } from 'redux'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { ROUTES } from '../../consts'
import { setCurrentPage } from '../../actions'

const TITLE = 'Herolo weather task'

const styles = (theme) => ({
  title: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 20,
    },
  },
  headerBtnsWrapper: {
    display: 'flex',
  },
  link: {
    textDecoration: 'none',
  },
  visible: {
    display: 'block',
    [theme.breakpoints.down('xs')]: {
      fill: 'white',
      marginLeft: 15,
    },
  },
  hide: {
    display: 'none',
  },
})

function Header(props) {
  const { classes, location: { pathname }, currentPage } = props
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {TITLE}
        </Typography>
        <div className={classes.headerBtnsWrapper}>
          <Link to={ROUTES.home} className={classes.link}>
            <Button
              color={pathname === ROUTES.home ? 'secondary' : ''}
              variant="text"
              className={`${matches ? classes.hide : classes.visible}`}
              // onClick={() => {
              //   console.log('in click')
              //   props.setCurrentPage('home')
              // }}
            >
              Home
            </Button>
            <AppsIcon className={`${!matches ? classes.hide : classes.visible}`} />
          </Link>
          <Link to={ROUTES.favorites} className={classes.link}>
            <Button
              color={pathname === ROUTES.favorites ? 'secondary' : ''}
              variant="text"
              className={`${matches ? classes.hide : classes.visible}`}
              // onClick={() => props.setCurrentPage('favorites')}
            >
            Favorites
            </Button>
            <StarBorderIcon className={`${!matches ? classes.hide : classes.visible}`} />
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = (state) => ({
  currentPage: state.currentPage,
})

export default compose(
  withRouter,
  connect(mapStateToProps, { setCurrentPage }),
  withStyles(styles),
)(Header)
