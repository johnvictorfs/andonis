import {
  CircularProgress,
  InputBase,
  makeStyles,
  InputBaseProps,
  fade
} from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
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
  circularProgress: {
    marginLeft: theme.spacing(1)
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
  }
}))

type Props = {
  loading: boolean

  /** @default <SearchIcon /> */
  icon?: React.ReactElement
} & InputBaseProps

const LoadingInput: React.FC<Props> = ({
  loading,
  icon = <SearchIcon />,
  ...props
}) => {
  const classes = useStyles()

  return (
    <div className={classes.search}>
      {/* {!loading && <div className={classes.searchIcon}>{icon}</div>} */}

      <InputBase
        disabled={loading}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        startAdornment={
          loading || (
            <CircularProgress
              className={classes.circularProgress}
              size="20px"
            />
          )
        }
        {...props}
      />
    </div>
  )
}

export default LoadingInput
