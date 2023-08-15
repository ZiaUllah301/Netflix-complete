import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.configs";
import mediaApi from "../api/modules/media.api";
import uiConfigs from "../configs/ui.configs";
import HeroSlide from "../components/common/HeroSlide";
import MediaGrid from "../components/common/MediaGrid";
import { setAppState } from "../redux/features/appStateSlice";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";
import usePrevious from "../hooks/usePrevious";

const MediaList = () => {
  const { mediaType } = useParams();
  console.log(mediaType);
  const [medias, setMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState(0);
  const [movieCategory, setmovieCategory] = useState("POPULAR");
  const [currPage, setCurrPage] = useState(1);

  const prevMediaType = usePrevious(mediaType);
  const dispatch = useDispatch();

  const mediaCategories = useMemo(() => ["popular", "top rated"], []);
  const category = ["popular", "top rated"];

  useEffect(() => {
    dispatch(setAppState(mediaType));
    window.scrollTo(0, 0);
  }, [mediaType, dispatch]);

  // useEffect(() => {
  //   const getMedias = async () => {
  //     // if (currPage === 1)
  //     dispatch(setGlobalLoading(true));
  //     setMediaLoading(true);
  //     if (movieCategory == "top-rated") {
  //       const { response, err } = await mediaApi
  //         .getTopRatedMovies
  //         //   {
  //         //   mediaType,
  //         //   mediaCategory: mediaCategories[currCategory],
  //         //   page: currPage,
  //         // }
  //         ();
  //       if (err) toast.error(err.message);
  //       console.log(response);
  //       if (response) {
  //         setMedias(response);
  //         // if (currPage !== 1)
  //         // setMedias((m) => [...m, ...response.results]);
  //         // else setMedias([...response.results]);
  //       }
  //     } else if (movieCategory == "popular") {
  //       const { response, err } = await mediaApi
  //         .getPopularMovie
  //         //   {
  //         //   mediaType,
  //         //   mediaCategory: mediaCategories[currCategory],
  //         //   page: currPage,
  //         // }
  //         ();
  //       if (err) toast.error(err.message);
  //       console.log(response);
  //       if (response) {
  //         setMedias(response);
  //         // if (currPage !== 1)
  //         // setMedias((m) => [...m, ...response.results]);
  //         // else setMedias([...response.results]);
  //       }
  //     }

  //     setMediaLoading(false);
  //     dispatch(setGlobalLoading(false));
  //   };

  //   // if (mediaType !== prevMediaType) {
  //   //   setCurrCategory(0);
  //   //   setCurrPage(1);
  //   // }

  //   getMedias();
  // }, [
  //  movieCategory
  // ]);
  const getMedias = async () => {
    dispatch(setGlobalLoading(true));
    setMediaLoading(true);

    let apiFunction;
    if (mediaType == "movie") {
      if (movieCategory === "TOP-RATED") {
        apiFunction = mediaApi.getTopRatedMovies;
      } else if (movieCategory === "POPULAR") {
        apiFunction = mediaApi.getPopularMovie;
      }
    } else if (mediaType == "Series") {
      console.log("mill gia mil gia season mill gia..............");
      if (movieCategory === "TOP-RATED") {
        apiFunction = mediaApi.getTopRatedSeries;
      } else if (movieCategory === "POPULAR") {
        apiFunction = mediaApi.getPopularSeries;
      }
    }

    if (apiFunction) {
      const { response, err } = await apiFunction();

      if (err) {
        toast.error(err.message);
      }

      console.log(response);

      if (response) {
        setMedias(response);
      }
    }

    setMediaLoading(false);
    dispatch(setGlobalLoading(false));
  };

  useEffect(() => {
    getMedias();
  }, [movieCategory, mediaType]);

  const onCategoryChange = (category) => {
    // if(movieCategory==)
    if (movieCategory === category) return;
    setmovieCategory(category);
    // setMedias([]);
    // getMedias();
    // setCurrPage(1);
    // setCurrCategory(categoryIndex);
  };

  const onLoadMore = () => setCurrPage(currPage + 1);

  return (
    <>
      <HeroSlide
        mediaType={mediaType}
        mediaCategory={mediaCategories[currCategory]}
        medias={medias}
      />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: 4 }}
        >
          <Typography fontWeight="700" variant="h5">
            {mediaType === tmdbConfigs.mediaType.movie ? "Movies" : "TV Series"}
          </Typography>
          <Stack direction="row" spacing={2}>
            {/* {category.map((cate, index) => ( */}
            <Button
              // key={index}
              size="large"
              variant={movieCategory === "POPULAR" ? "contained" : "text"}
              sx={{
                color:
                  movieCategory === "POPULAR"
                    ? "primary.contrastText"
                    : "text.primary",
              }}
              onClick={() => onCategoryChange("POPULAR")}
            >
              POPULAR
            </Button>
            {/* ))} */}
            <Button
              // key={index}
              size="large"
              variant={movieCategory === "TOP-RATED" ? "contained" : "text"}
              sx={{
                color:
                  movieCategory === "TOP-RATED"
                    ? "primary.contrastText"
                    : "text.primary",
              }}
              onClick={() => onCategoryChange("TOP-RATED")}
            >
              TOP RATED
            </Button>
          </Stack>
        </Stack>
        <MediaGrid medias={medias} mediaType={mediaType} />
        <LoadingButton
          sx={{ marginTop: 8 }}
          fullWidth
          color="primary"
          loading={mediaLoading}
          onClick={onLoadMore}
        >
          load more
        </LoadingButton>
      </Box>
    </>
  );
};

export default MediaList;
