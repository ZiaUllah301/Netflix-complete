import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import NavigationSwiper from "./NavigationSwiper";
import { BASEURL } from "../../ApiUrl";

const MediaVideo = ({ video }) => {
  const iframeRef = useRef();

  useEffect(() => {
    console.log("ifram");
    const height = iframeRef.current.offsetWidth * 9 / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, [video]);

  return (
    <Box sx={{ height: "max-content" }}>
      <iframe
        // key={video._id}
        src={`${BASEURL}/${video}`}
        ref={iframeRef}
        width="100%"
        allow="fullscreen"
        // title={video.title}
        style={{ border: 0 }}
      ></iframe>
    </Box>
  );
};

const MediaVideosSlide = ({ media }) => {
  console.log({ media });
  return (
    // <NavigationSwiper>
    //   {videos.map((video, index) => (
    //     <SwiperSlide key={index}>
          <MediaVideo video={media} />
    //     </SwiperSlide>
    //   ))}
    // </NavigationSwiper>
  );
};

export default MediaVideosSlide;