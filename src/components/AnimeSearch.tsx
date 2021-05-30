import { useState } from 'react'

import { gql, useLazyQuery } from '@apollo/client'

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
  ListItemIcon
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { SearchAnime } from './__generated__/SearchAnime'

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
  }
}))

const SEARCH_ANIME = gql`
  query SearchAnime($query: String) {
    Page(perPage: 6) {
      media(search: $query, type: ANIME) {
        id
        coverImage {
          large
          color
        }
        title {
          userPreferred
        }
        seasonYear
        format
      }
    }
  }
`

const AnimeSearch: React.FC = () => {
  const [query, setQuery] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const classes = useStyles()

  const [getAnime, { loading, data }] = useLazyQuery<SearchAnime>(SEARCH_ANIME)

  const searchAnime = () => {
    getAnime({ variables: { query } })
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  return (
    <>
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
          startAdornment={
            loading && (
              <CircularProgress
                className={classes.circularProgress}
                size="20px"
              />
            )
          }
          onChange={handleQueryChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              searchAnime()
            }
          }}
        />
      </div>

      <Popper
        open={!!anchorEl}
        anchorEl={anchorEl}
        placement="bottom"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            {(data && (
              <Paper>
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
    </>
  )
}

export default AnimeSearch
