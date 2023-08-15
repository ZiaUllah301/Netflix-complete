import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import CircularRate from "../components/common/CircularRate";
import Container from "../components/common/Container";
import ImageHeader from "../components/common/ImageHeader";

import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.configs";
import mediaApi from "../api/modules/media.api";
import favoriteApi from "../api/modules/favorite.api";

import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { addFavorite, removeFavorite } from "../redux/features/userSlice";

import CastSlide from "../components/common/CastSlide";
import MediaVideosSlide from "../components/common/MediaVideosSlide";
import BackdropSlide from "../components/common/BackdropSlide";
import PosterSlide from "../components/common/PosterSlide";
import RecommendSlide from "../components/common/RecommendSlide";
import MediaSlide from "../components/common/MediaSlide";
import MediaReview from "../components/common/MediaReview";
import { BASEURL } from "../ApiUrl";
import favoriteUtils from "../utils/favorite.utils";
import Episodes from "../components/common/Modal/Episodes";

const MediaDetail = () => {
  const navigate=useNavigate()
  const { mediaType, mediaId } = useParams();
  const { user, listFavorites } = useSelector((state) => state.user);
  //  const navogate=useNavigate()
  const [media, setMedia] = useState();
  const [review, setreview] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);

  const dispatch = useDispatch();

  const videoRef = useRef(null);
  const apiFunction =
    mediaType == "movie" ? mediaApi.getDetailMovie : mediaApi.getDetailSeason;
  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await apiFunction({ mediaType, mediaId });
      dispatch(setGlobalLoading(false));

      console.log(response);

      if (response) {
        if (mediaType == "movie") {
          setMedia(response.movie);
          setGenres(response.movie.genre);
          setreview(response.reviews);
        } else if (mediaType == "series") {
          setMedia(response.series);
          setGenres(response.series.genre);
          // setreview(response.reviews);
        }
      }

      if (err) {
        toast.error(err.message);
      }
    };

    getMedia();
  }, [mediaType, mediaId, dispatch]);

  const onFavoriteClick = async () => {
    // if (!user) return dispatch(setAuthModalOpen(true));

    if (onRequest) return;

    if (isFavorite) {
      onRemoveFavorite();
      return;
    }

    setOnRequest(true);

    const body = {
      userId: user._id,
      id: media._id,
      type: media.type,
    };

    const { response, err } = await favoriteApi.add(body);
    console.log(response);
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(addFavorite(media));
      toast.success("Add favorite success");
    }
  };

  const onRemoveFavorite = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await favoriteApi.remove({
      userId: user._id,
      id: mediaId,
      type: media.type,
    });

    setOnRequest(false);
    if (err) toast.error(err.message);
    if (response) {
      dispatch(removeFavorite({ mediaId: mediaId }));
      toast.success("Remove favorite success");
    }
  };
  useEffect(() => {
    renderMediaItems();
  }, [listFavorites]);

  const renderMediaItems = () => {
    const isFavorite = favoriteUtils.check({
      listFavorites,
      mediaId,
    });
    if (isFavorite) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };
  return media ? (
    <>
      <ImageHeader imgPath={`${BASEURL}/${media.backdropImage[0]}`} />
      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
        }}
      >
        {/* media content */}
        <Box
          sx={{
            marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            {/* poster */}
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}
            >
              <Box
                sx={{
                  paddingTop: "140%",
                  ...uiConfigs.style.backgroundImage(
                    `${BASEURL}/${media.image[0]}`
                  ),
                }}
              />
            </Box>
            {/* poster */}

            {/* media info */}
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                color: "text.primary",
              }}
            >
              <Stack spacing={5}>
                {/* title */}
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                  fontWeight="700"
                  sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                >
                  {`${media.title} ${
                    mediaType === tmdbConfigs.mediaType.movie
                      ? media.releaseDate.split("-")[0]
                      : media.releaseDate.split("-")[0]
                  }`}
                </Typography>
                {/* title */}

                {/* rate and genres */}
                <Stack direction="row" spacing={1} alignItems="center">
                  {/* rate */}
                  <CircularRate value={media.rating} />
                  {/* rate */}
                  <Divider orientation="vertical" />
                  {/* genres */}
                  {genres.map((genre, index) => (
                    <Chip
                      label={genre}
                      variant="filled"
                      color="primary"
                      key={index}
                    />
                  ))}
                  {/* genres */}
                </Stack>
                {/* rate and genres */}

                {/* overview */}
                <Typography
                  variant="body1"
                  sx={{ ...uiConfigs.style.typoLines(5) }}
                >
                  {media.description}
                </Typography>
                {/* overview */}

                {/* buttons */}
                <Stack direction="row" spacing={1}>
                  <LoadingButton
                    variant="text"
                    sx={{
                      width: "max-content",
                      "& .MuiButon-starIcon": { marginRight: "0" },
                    }}
                    size="large"
                    startIcon={
                      isFavorite ? (
                        <>
                          <FavoriteIcon />
                        </>
                      ) : (
                        <>
                          <FavoriteBorderOutlinedIcon />
                        </>
                      )
                    }
                    loadingPosition="start"
                    loading={onRequest}
                    onClick={onFavoriteClick}
                  />
                  <Button
                    variant="contained"
                    sx={{ width: "max-content" }}
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    onClick={() =>  navigate(`/watch/${media.type}/${media._id}`)}
                  >
                    watch now
                  </Button>
                </Stack>
                {/* buttons */}

                {/* cast.................................................................... */}
                <Container header="Cast">
                  <CastSlide casts={media.cast} />
                </Container>
                {/* cast .......................................................................*/}
              </Stack>
            </Box>
            {/* media info */}
          </Box>
        </Box>

        {/* episodes content................................................ */}
        {media?.type == "series" ? <Episodes mediaId={media?._id} /> : null}

        {/* end episode content................................................. */}
        {/* media content */}   
 {/* media trailor videos.......................................................................... */}
 <div ref={videoRef}  > 
          {/* <ReactPlayer url="https://www.dropbox.com/s/df2d2gf1dvnr5uj/Sample_1280x720_mp4.mp4" /> */}
          <Container header="Trailor">
            <MediaVideosSlide media={media?.trailer} />
          </Container>
        </div>
        {/* media videos........................................................................... */}
{/* media videos.......................................................................... */}
    {/* <ReactPlayer url="https://www.dropbox.com/s/df2d2gf1dvnr5uj/Sample_1280x720_mp4.mp4" /> */}
        {
          media?.type==="movie" &&  
          <div ref={videoRef} style={{ paddingTop: "2rem" }}> 
        
            <Container header="Movie">
              <MediaVideosSlide media={media?.movieUrl} />
            </Container>
          </div>
       
        }
           {/* media videos........................................................................... */}
       

        {/* media backdrop */}
        {media?.backdropImage?.length > 0 && (
          <Container header="backdrops">
            <BackdropSlide backdrops={media.backdropImage} />
          </Container>
        )}
        {/* media backdrop */}

        {/* media posters */}
        {media?.image?.length > 0 && (
          <Container header="posters">
            <PosterSlide posters={media.image} />
          </Container>
        )}
        {/* media posters */}

        {/* media reviews */}
        {review &&  <MediaReview reviews={review} media={media} mediaType={media?.type} />}
       
        {/* media reviews */}

        {/* media recommendation */}
        {/* <Container header="you may also like">
          {media.recommend.length > 0 && (
            <RecommendSlide medias={media.recommend} mediaType={mediaType} />
          )}
          {media.recommend.length === 0 && (
            <MediaSlide
              mediaType={mediaType}
              mediaCategory={tmdbConfigs.mediaCategory.top_rated}
            />
          )}
        </Container> */}
        {/* media recommendation */}
      </Box>
    </>
  ) : null;
};

export default MediaDetail;
