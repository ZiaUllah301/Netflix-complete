import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Hidden,
  Stack,
  Typography,
} from "@mui/material";
import "../../utils/Helper.css";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircularRate from "./CircularRate";
import { useDispatch, useSelector } from "react-redux";
import favoriteUtils from "../../utils/favorite.utils";
import { BASEURL } from "../../ApiUrl";
import AddIcon from "@mui/icons-material/Add";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DoneIcon from '@mui/icons-material/Done';
import favoriteApi from "../../api/modules/favorite.api";
import { addFavorite, removeFavorite } from "../../redux/features/userSlice";
import { toast } from "react-toastify";
const MediaItem = ({ media, mediaType }) => {
  console.log(media);
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { user,listFavorites } = useSelector((state) => state.user);
  const [onRequest, setOnRequest] = useState(false);
  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [rate, setRate] = useState(null);
  const videoRef = useRef(null);
  // Function to play the video when hovering over the card
  const playVideoOnHover = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => console.log(error));
    }
  };

  // Function to stop the video when leaving the card hover
  const stopVideoOnLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      // videoRef.current.currentTime = 0; // Reset the video to the beginning
    }
  };
  const navigate = useNavigate();
  const dispatch=useDispatch()
  
  const handleNavigate = (media) => {
    console.log(media);
    navigate(`/watch/${mediaType}/${media._id}`);
  };
  useEffect(() => {
    setTitle(media?.title);
    setPosterPath(media?.image[0]);
    setReleaseDate(media?.releaseDate.split("-")[0]);
    setRate(media?.rating);
  }, [media, mediaType]);
  const renderCommaSeparatedGenres = (genresArray) => {
    return genresArray.join(", ");
  };
  const onFavoriteClick = async () => {
    // if (!user) return dispatch(setAuthModalOpen(true));
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
      id: media._id,
      type: media.type,
    });

    setOnRequest(false);
    if (err) toast.error(err.message);
    if (response) {
      dispatch(removeFavorite({ mediaId: media._id }));
      toast.success("Remove favorite success");
    }
  };
  // const onFavoriteClick = async () => {
  //   // if (!user) return dispatch(setAuthModalOpen(true));

  //   if (onRequest) return;

  //   if (isFavorite) {
  //     onRemoveFavorite();
  //     return;
  //   }

  //   setOnRequest(true);

  //   const body = {
  //     userId: user._id,
  //     id: media._id,
  //     type: media.type,
  //   };

  //   const { response, err } = await favoriteApi.add(body);
  //   console.log(response);
  //   setOnRequest(false);

  //   if (err) toast.error(err.message);
  //   if (response) {
  //     dispatch(addFavorite(media));
  //     toast.success("Add favorite success");
  //   }
  // };

  // const onRemoveFavorite = async () => {
  //   if (onRequest) return;
  //   setOnRequest(true);
  //   const { response, err } = await favoriteApi.remove({
  //     userId: user._id,
  //     id: mediaId,
  //     type: media.type,
  //   });

  //   setOnRequest(false);
  //   if (err) toast.error(err.message);
  //   if (response) {
  //     dispatch(removeFavorite({ mediaId: mediaId }));
  //     toast.success("Remove favorite success");
  //   }
  // };
  return (
    <>
    <Box
      style={{ cursor: "pointer",margin:"0 4px" }}
      sx={{
        ...uiConfigs.style.backgroundImage(`${BASEURL}/${posterPath}`),
        paddingTop: "160%",
        "&:hover .media-info": { opacity: 1, bottom: 0 },
        "&:hover .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
        color: "primary.contrastText",
      }}
    >
      
      {/* movie or tv item */}
      {isMobileOrTablet ?  <Stack spacing={{ xs: 1, md: 2 }}>

             <div style={{padding:"10px"}}>
            
{rate && <CircularRate value={rate} />}

<Typography>{releaseDate}</Typography>

<Typography
  variant="body1"
  fontWeight="700"
  sx={{
    fontSize: "1rem",
    ...uiConfigs.style.typoLines(1, "left"),
  }}
>
  {title}
</Typography>
</div> 
</Stack> : (
          <>
            <Box
              className="media-info"
              sx={{
                transition: "all 0.3s ease-in-out",
                opacity: { xs: 1, md: 0 },
                position: "absolute",
                bottom: { xs: 0, md: "-20px" },
                width: "100%",
                height: "max-content",
                boxSizing: "border-box",
              }}
            >
            
  
              <Stack spacing={{ xs: 1, md: 2 }}>
                <Card sx={{ maxWidth: 345 }}  onMouseEnter={playVideoOnHover}
      onMouseLeave={stopVideoOnLeave}>
                  <CardMedia
                   ref={videoRef}
                  sx={{margin:0}}
                    component="video"
                    // className={classes.media}
                    height="140"
                    image={`${BASEURL}/${media?.trailer}`}
                    autoPlay
                    controls
                  />
                  <CardContent style={{ marginTop: "2px" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {media?.title}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div
                      className="icon-wrapper"
                      onClick={() => handleNavigate(media)}
                    >
                      <PlayCircleIcon fontSize="large" />
                    </div>
                    <div>
                    {!favoriteUtils.check({
                      listFavorites,
                      mediaId: media._id,
                    }) ?(
                      
                      <div className="icon-wrapper" onClick={onFavoriteClick}>
                        <AddIcon />
                      </div>
                    ):(
                      <div className="icon-wrapper" onClick={onRemoveFavorite}>
                      <DoneIcon />
                    </div>
                    )
                    }
                    </div>
  
                    <div className="icon-wrapper">
                      <ThumbUpIcon />
                    </div>
                    <div
                      className="icon-wrapper"
                      onClick={() => navigate(`/${media?.type}/${media?._id}`)}
                    >
                      <KeyboardArrowDownIcon />
                    </div>
                    {/* <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button> */}
                  </CardActions>
                  <CardActions>
                    {" "}
                    <Typography variant="body2" color="text.secondary">
                      {renderCommaSeparatedGenres(media?.genre)}
                    </Typography>
                  </CardActions>
                </Card>
              </Stack>
            </Box>
          </>
        )}
      

      {/* movie or tv item */}

      {/* people */}
      {mediaType === "people" && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "max-content",
            bottom: 0,
            padding: "10px",
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <Typography sx={{ ...uiConfigs.style.typoLines(1, "left") }}>
            {media?.name}
          </Typography>
        </Box>
      )}
      {/* people */}
    </Box>
    </>
  );
};

export default MediaItem;
