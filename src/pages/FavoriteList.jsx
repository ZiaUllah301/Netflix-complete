import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MediaItem from "../components/common/MediaItem";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import favoriteApi from "../api/modules/favorite.api";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { removeFavorite, setListFavorites } from "../redux/features/userSlice";

const FavoriteItem = ({ media, onRemoved }) => {
  console.log(media);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
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
      toast.success("Remove favorite success");
      dispatch(removeFavorite({ mediaId: media._id }));
      onRemoved(media._id);
    }
  };

  return (
    <>
      <MediaItem media={media} mediaType={media.type} />
      <LoadingButton
        fullWidth
        variant="contained"
        sx={{ marginTop: 2 }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={onRequest}
        onClick={onRemove}
      >
        remove
      </LoadingButton>
    </>
  );
};

const FavoriteList = () => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const { user, listFavorites } = useSelector((state) => state.user);
  const skip = 8;

  useEffect(() => {
    const less = [...listFavorites];
    setFilteredMedias(less.splice(0, skip));
  }, [listFavorites]);

  useEffect(() => {
    dispatch(setGlobalLoading(true));
    setCount(listFavorites.length);
    setMedias(listFavorites);
    dispatch(setGlobalLoading(false));
  }, [filteredMedias]);

  const onLoadMore = () => {
    setFilteredMedias(
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip)
    );
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newMedias = [...medias].filter((e) => e._id !== id);
    setMedias(newMedias);
    setFilteredMedias(...newMedias.splice(0, page * skip));
    setCount(count - 1);
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your favorites (${count})`}>
        <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
          {filteredMedias?.map((media, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              {console.log(media)}
              <FavoriteItem media={media} onRemoved={onRemoved} />
            </Grid>
          ))}
        </Grid>
        {filteredMedias.length < medias.length && (
          <Button onClick={onLoadMore}>load more</Button>
        )}
      </Container>
    </Box>
  );
};

export default FavoriteList;
