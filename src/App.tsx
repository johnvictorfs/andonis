import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core'
import { ApolloProvider } from '@apollo/client'

import { anilistClient } from '@/services/anilist'
import Routes from '@/Routes'

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />

    <ApolloProvider client={anilistClient}>
      <Routes />
    </ApolloProvider>
  </ThemeProvider>
)

export default App
