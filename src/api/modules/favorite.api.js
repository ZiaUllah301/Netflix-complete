import privateClient from "../client/private.client";

const favoriteEndpoints = {
  list: "api/user/getFav",
  add: "api/user/addFav",
  // remove: ({ favoriteId }) => `user/favorites/${favoriteId}`,
  remove: "api/user/deleteFav",
};

const favoriteApi = {
  getList: async ({ userId }) => {
    try {
      const response = await privateClient.post(favoriteEndpoints.list, {
        userId,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  add: async ({ userId, id, type }) => {
    try {
      const response = await privateClient.post(favoriteEndpoints.add, {
        userId,
        id,
        type,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  remove: async ({ userId, id, type }) => {
    try {
      const response = await privateClient.post(favoriteEndpoints.remove, {
        userId,
        id,
        type,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default favoriteApi;
