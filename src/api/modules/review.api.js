import privateClient from "../client/private.client";

const reviewEndpoints = {
  list: "reviews",
  add: "/api/review/createReview",
  remove: "/api/review/deleteReview",
};

const reviewApi = {
  add: async ({ userId, comment, movieId }) => {
    try {
      const response = await privateClient.post(reviewEndpoints.add, {
        userId,
        comment,
        movieId,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  remove: async ({ reviewId }) => {
    try {
      const response = await privateClient.post(reviewEndpoints.remove, {
        reviewId,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getList: async () => {
    try {
      const response = await privateClient.get(reviewEndpoints.list);

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default reviewApi;
