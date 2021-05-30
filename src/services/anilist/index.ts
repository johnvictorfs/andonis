import { ApolloClient, InMemoryCache } from '@apollo/client'

export const anilistClient = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache()
})
