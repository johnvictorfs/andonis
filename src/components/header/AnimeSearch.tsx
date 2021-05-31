import { useState } from 'react'

import { useLazyQuery } from '@apollo/client'

import { fade, makeStyles } from '@material-ui/core/styles'
import {
  CircularProgress,
  InputBase,
  Popper,
  Fade,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ClickAwayListener
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import { SearchAnime } from '@/components/__generated__/SearchAnime'
import { SEARCH_ANIME } from '@/services/anilist/queries'

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    marginLeft: theme.spacing(1)
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    fontSize: 20,
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '15ch',
      '&:focus': {
        width: '25ch'
      }
    }
  },
  searchResults: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper
  },
  previewPaper: {
    marginTop: 10
  }
}))

const AnimeSearch: React.FC = () => {
  const [query, setQuery] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const classes = useStyles()

  const [getAnime, { loading, data }] = useLazyQuery<SearchAnime>(SEARCH_ANIME)

  const searchAnime = () => getAnime({ variables: { query } })

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const submitSearch: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      searchAnime()
      setAnchorEl(event.currentTarget)
    }
  }

  const closeSearchPreview = () => setAnchorEl(null)

  const openSearchPreview = (event: React.MouseEvent<HTMLInputElement>) => {
    if (data) {
      setAnchorEl(event.currentTarget)
    }
  }

  return (
    <ClickAwayListener onClickAway={closeSearchPreview}>
      <span>
        <div className={classes.search}>
          {!loading && (
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
          )}

          <InputBase
            disabled={loading}
            placeholder="Search Anime..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            value={query}
            onClick={openSearchPreview}
            startAdornment={
              loading && (
                <CircularProgress
                  className={classes.circularProgress}
                  size="20px"
                />
              )
            }
            onChange={handleQueryChange}
            onKeyPress={submitSearch}
          />
        </div>

        <Popper
          open={!!anchorEl && !!data}
          anchorEl={anchorEl}
          placement="bottom-start"
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              {(data && (
                <Paper className={classes.previewPaper}>
                  <Grid container spacing={1}>
                    <List component="nav" aria-label="anime-search-results">
                      {data?.Page?.media?.map((media) => (
                        <ListItem key={media?.id} button>
                          <ListItemIcon>
                            <img
                              src={media?.coverImage?.large || '#'}
                              alt={media?.title?.userPreferred || 'anime-cover'}
                              width="48"
                              height="64"
                              style={{ marginRight: 5 }}
                            />
                          </ListItemIcon>

                          <ListItemText
                            primary={media?.title?.userPreferred}
                            secondary={`${media?.seasonYear || 'Unknown'} (${
                              media?.format
                            })`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Paper>
              )) || <span />}
            </Fade>
          )}
        </Popper>
      </span>
    </ClickAwayListener>
  )
}

export default AnimeSearch
