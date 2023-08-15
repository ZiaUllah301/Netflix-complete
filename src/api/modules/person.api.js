import publicClient from "../client/public.client";

const personEndpoints = {
  detail: `api/actor/getSpecificActor`,
  medias: "/api/actor/getActorMovies",
};

const personApi = {
  detail: async ({ personId }) => {
    try {
      const response = await publicClient.post(personEndpoints.detail, {
        actorId: personId,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  medias: async ({ personId }) => {
    try {
      const response = await publicClient.post(personEndpoints.medias, {
        actorId: personId,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default personApi;
