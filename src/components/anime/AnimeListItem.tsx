import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

import { SearchAnime_Page_media } from '@/services/anilist/__generated__/SearchAnime'

type Props = {
  media: SearchAnime_Page_media
}

const AnimeListItem: React.FC<Props> = ({ media }) => (
  <ListItem key={media.id} button>
    <ListItemIcon>
      <img
        src={media.coverImage?.large || '#'}
        alt={media.title?.userPreferred || 'anime-cover'}
        width="48"
        height="64"
        style={{ marginRight: 5 }}
      />
    </ListItemIcon>

    <ListItemText
      primary={media.title?.userPreferred}
      secondary={`${media.seasonYear || 'Unknown'} (${media.format})`}
    />
  </ListItem>
)

export default AnimeListItem
