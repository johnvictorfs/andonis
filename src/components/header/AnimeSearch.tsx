import { useState } from 'react'

import { useLazyQuery } from '@apollo/client'

import {
  Popper,
  Fade,
  Paper,
  Grid,
  List,
  ClickAwayListener,
  makeStyles
} from '@material-ui/core'

import { SearchAnime } from '@/components/__generated__/SearchAnime'
import AnimeListItem from '@/components/anime/AnimeListItem'
import LoadingInput from '@/components/inputs/LoadingInput'
import { SEARCH_ANIME } from '@/services/anilist/queries'

const useStyles = makeStyles(() => ({
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
        <LoadingInput
          loading={loading}
          placeholder="Search Anime..."
          value={query}
          onClick={openSearchPreview}
          onChange={handleQueryChange}
          onKeyPress={submitSearch}
        />

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
                      {data?.Page?.media?.map(
                        (media) =>
                          media && (
                            <AnimeListItem key={media.id} media={media} />
                          )
                      )}
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
