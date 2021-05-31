import { gql } from '@apollo/client'

export const SEARCH_ANIME = gql`
  query SearchAnime($query: String) {
    Page(perPage: 6) {
      media(search: $query, type: ANIME) {
        id
        coverImage {
          large
          color
        }
        title {
          userPreferred
        }
        seasonYear
        format
      }
    }
  }
`
