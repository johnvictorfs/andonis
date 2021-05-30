import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core'
import { ApolloProvider } from '@apollo/client'

import { anilistClient } from '@/services/anilist'
import Routes from '@/Routes'

const theme = createMuiTheme({
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
    }
  }
})

const App: React.FC = () => (
  <ApolloProvider client={anilistClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Routes />
    </ThemeProvider>
  </ApolloProvider>
)

export default App
