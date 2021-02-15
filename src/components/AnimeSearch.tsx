import { useState } from 'react'

import { gql, useLazyQuery } from '@apollo/client'

import { fade, makeStyles } from '@material-ui/core/styles'
import { CircularProgress, InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    marginLeft: theme.spacing(1),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
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
        width: '25ch',
      },
    },
  },
}))

const SEARCH_ANIME = gql`
  query($query: String) {
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
      }
    }
  }
`

const AnimeSearch: React.FC = () => {
  const [query, setQuery] = useState('')
  const classes = useStyles()

  const [getAnime, { loading, data }] = useLazyQuery(SEARCH_ANIME)

  const searchAnime = () => {
    getAnime({ variables: { query } })
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
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
            input: classes.inputInput,
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
    </>
  )
}

export default AnimeSearch
