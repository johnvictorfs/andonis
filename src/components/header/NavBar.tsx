import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import AnimeSearch from '@/components/header/AnimeSearch'
import AniListIcon from '@/components/icons/AniListIcon'
import Button from '@/components/material/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    marginRight: theme.spacing(2)
  },
  separator: {
    flexGrow: 1
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

        <span className={classes.separator} />

        <Button variant="contained" color="primary" startIcon={<AniListIcon />}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
