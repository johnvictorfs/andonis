import { ApolloProvider } from '@apollo/client'

import { anilistClient } from '@/services/anilist'
import Routes from '@/Routes'

const App: React.FC = () => (
  <ApolloProvider client={anilistClient}>
    <Routes />
  </ApolloProvider>
)

export default App
