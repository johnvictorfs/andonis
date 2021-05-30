/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MediaFormat } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: SearchAnime
// ====================================================

export interface SearchAnime_Page_media_coverImage {
  __typename: "MediaCoverImage";
  /**
   * The cover image url of the media at a large size
   */
  large: string | null;
  /**
   * Average #hex color of cover image
   */
  color: string | null;
}

export interface SearchAnime_Page_media_title {
  __typename: "MediaTitle";
  /**
   * The currently authenticated users preferred title language. Default romaji for non-authenticated
   */
  userPreferred: string | null;
}

export interface SearchAnime_Page_media {
  __typename: "Media";
  /**
   * The id of the media
   */
  id: number;
  /**
   * The cover images of the media
   */
  coverImage: SearchAnime_Page_media_coverImage | null;
  /**
   * The official titles of the media in various languages
   */
  title: SearchAnime_Page_media_title | null;
  /**
   * The season year the media was initially released in
   */
  seasonYear: number | null;
  /**
   * The format the media was released in
   */
  format: MediaFormat | null;
}

export interface SearchAnime_Page {
  __typename: "Page";
  media: (SearchAnime_Page_media | null)[] | null;
}

export interface SearchAnime {
  Page: SearchAnime_Page | null;
}

export interface SearchAnimeVariables {
  query?: string | null;
}
