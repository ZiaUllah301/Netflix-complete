import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import mediaApi from "../../api/modules/media.api";
import AutoSwiper from "./AutoSwiper";
import { toast } from "react-toastify";
import MediaItem from "./MediaItem";

const MediaSlide = ({ mediaType }) => {
  const [medias, setMedias] = useState([]);
  useEffect(() => {
    const getMedias = async () => {
      const mediaApiFunctions = {
        "top-movie": mediaApi.getTopRatedMovies,
        "top-season": mediaApi.getTopRatedSeries,
        "popular-season": mediaApi.getPopularSeries,
        "popular-movie": mediaApi.getPopularMovie,
      };

      const apiFunction = mediaApiFunctions[mediaType];

      if (apiFunction) {
        const { response, err } = await apiFunction({ mediaType });

        console.log(response);

        if (response) {
          setMedias(response);
        }

        if (err) {
          toast.error(err.message);
        }
      }
    };

    getMedias();
  }, [mediaType]);

  return (
    <AutoSwiper>
      {medias?.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={media.type} index={index} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;
