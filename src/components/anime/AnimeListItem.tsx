import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  withStyles
} from '@material-ui/core'

import { SearchAnime_Page_media } from '@/services/anilist/__generated__/SearchAnime'

type Props = {
  media: SearchAnime_Page_media
}

const ReleasingBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: theme.palette.success.main,
    border: `1px solid ${theme.palette.success.dark}`,
    transform: 'scale(2) translate(-50%, -50%)'
  }
}))(Badge)

const AnimeListItem: React.FC<Props> = ({ media }) => (
  <ListItem key={media.id} button>
    <ListItemIcon>
      <ReleasingBadge
        invisible={media.status !== 'RELEASING'}
        variant="dot"
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <img
          src={media.coverImage?.large || '#'}
          alt={media.title?.userPreferred || 'anime-cover'}
          width="48"
          height="64"
          style={{ marginRight: 5 }}
        />
      </ReleasingBadge>
    </ListItemIcon>

    <ListItemText
      primary={media.title?.userPreferred}
      secondary={`${media.seasonYear || 'Unknown'} (${media.format})`}
    />
  </ListItem>
)

export default AnimeListItem
