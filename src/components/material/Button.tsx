import { withStyles, Button as MUIButton } from '@material-ui/core'

const Button = withStyles((theme) => ({
  textPrimary: {
    color: theme.palette.text.primary
  }
}))(MUIButton)

export default Button
