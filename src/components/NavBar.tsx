import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import AnimeSearch from '@/components/AnimeSearch'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    marginRight: theme.spacing(2)
  }
}))

const NavBar: React.FC = () => {
  const classes = useStyles()

  return (
    <AppBar position="static" className={classes.root} color="inherit">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" className={classes.title}>
          Andonis
        </Typography>

        <AnimeSearch />
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
