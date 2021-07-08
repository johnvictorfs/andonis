import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    text: {
      disabled: '#9B9B9B',
      primary: '#AFC0D5',
      secondary: '#DADADA'
    },
    background: {
      default: '#243340',
      paper: '#192330'
    },
    primary: {
      main: '#354B5E',
      dark: '#213441',
      light: '#AFC0D5'
    },
    secondary: {
      main: '#084ac5',
      dark: '#063792',
      light: '#0752de'
    }
  }
})
