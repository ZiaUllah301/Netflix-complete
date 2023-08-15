import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    listFavorites: [],
  },
  reducers: {
    setUser: (state, action) => {
      // if (action.payload === null) {
      //   localStorage.removeItem("userData");
      // } else {
      //   if (action.payload)
      //     localStorage.setItem("userData", JSON.stringify(action.payload));
      // }

      state.user = action.payload;
      console.log(state.user);
    },
    setListFavorites: (state, action) => {
      state.listFavorites = action.payload;
      console.log(state.listFavorites);
    },
    removeFavorite: (state, action) => {
      const { mediaId } = action.payload;
      console.log(mediaId);
      state.listFavorites = state.listFavorites.filter(
        (e) => e._id.toString() !== mediaId.toString()
      );
    },
    addFavorite: (state, action) => {
      state.listFavorites = [action.payload, ...state.listFavorites];
    },
  },
});

export const { setUser, setListFavorites, addFavorite, removeFavorite } =
  userSlice.actions;

export default userSlice.reducer;
