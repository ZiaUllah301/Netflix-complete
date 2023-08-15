// const favoriteUtils = {
//   check: ({ listFavorites, mediaId }) =>{
//     listFavorites &&
//     listFavorites.find((e) => e._id.toString() === mediaId.toString()) !==
//       undefined,
//   }
// };

// export default favoriteUtils;

const favoriteUtils = {
  check: ({ listFavorites, mediaId }) =>
    listFavorites &&
    listFavorites.find((e) => e._id.toString() === mediaId.toString()) !==
      undefined,
};

export default favoriteUtils;
