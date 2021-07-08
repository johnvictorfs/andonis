import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { ApolloProvider } from '@apollo/client'

import { anilistClient } from '@/services/anilist'
import { theme } from '@/theme'
import Routes from '@/Routes'

const App: React.FC = () => (
  <ApolloProvider client={anilistClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Routes />
    </ThemeProvider>
  </ApolloProvider>
)

export default App
