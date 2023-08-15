import React, { useEffect, useState } from "react";
import HeroSlide from "../components/common/HeroSlide";
import tmdbConfigs from "../api/configs/tmdb.configs";
import { Box } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide";
import mediaApi from "../api/modules/media.api";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getMedias = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getList();
      console.log(response);
      if (response) setMovies(response.movies);
      if (err) toast.error(err.message);
      dispatch(setGlobalLoading(false));
    }

    getMedias();
  }, []);
  return (
    <>
      <HeroSlide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
        medias={movies}
      />

      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        <Container header="popular movies">
          <MediaSlide mediaType="popular-movie" />
        </Container>

        <Container header="popular series">
          <MediaSlide mediaType="popular-season" />
        </Container>

        <Container header="top rated movies">
          <MediaSlide mediaType="top-movie" />
        </Container>

        <Container header="top rated season">
          <MediaSlide mediaType="top-season" />
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
