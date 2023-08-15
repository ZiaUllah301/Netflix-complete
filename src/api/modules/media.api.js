import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const mediaEndpoints = {
  // list: ({ mediaType, mediaCategory, page }) => `${mediaType}/${mediaCategory}?page=${page}`,
  list: "api/movie/getAllMovies",
  // categroy: "api/movie/getMoviesByRating",
  topRatedMovie: `api/movie/getMoviesByRating`,
  topRatedseries: `api/series/getSeriesByRating`,
  popularMovie: `api/movie/getMoviesByPopularity`,
  popularseries: `api/series/getSeriesByPopularity`,
  movieDetail: `api/movie/getSpecificMovie`,
  seasonDetail: `api/series/getSpecificSeries`,
  // detail: "api/movie/getSpecificMovie",
  detail: ({ mediaType, mediaApi }) => `/api/${mediaType}/${mediaApi}`,
  search:"api/movie/searchMovieSeason",
  // search: ({ mediaType, query, page }) =>
  //   `${mediaType}/search?query=${query}&page=${page}`,
};

const mediaApi = {
  getList: async () => {
    try {
      const response = await publicClient.get(
        // mediaEndpoints.list({ mediaType, mediaCategory, page })
        mediaEndpoints.list
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getTopRatedMovies: async () => {
    try {
      const response = await publicClient.get(mediaEndpoints.topRatedMovie);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getTopRatedSeries: async () => {
    try {
      const response = await publicClient.get(mediaEndpoints.topRatedseries);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getPopularSeries: async () => {
    try {
      const response = await publicClient.get(mediaEndpoints.popularseries);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getPopularMovie: async () => {
    try {
      const response = await publicClient.get(mediaEndpoints.popularMovie);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getDetailSeason: async ({ mediaId }) => {
    try {
      const response = await privateClient.post(
        // mediaEndpoints.detail({ mediaType, mediaId })
        mediaEndpoints.seasonDetail,
        {
          seriesId: mediaId,
        }
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getDetailMovie: async ({ mediaId }) => {
    try {
      const response = await privateClient.post(
        // mediaEndpoints.detail({ mediaType, mediaId })
        mediaEndpoints.movieDetail,
        {
          movieId: mediaId,
        }
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  search: async ({ mediaType, query, page }) => {
    try {
      const response = await publicClient.post(
        mediaEndpoints.search,{keyword:query,page,type:mediaType}
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default mediaApi;
