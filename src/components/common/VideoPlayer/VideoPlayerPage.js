// import React from "react";
// import VideoPlayer from "./VideoPlayer";
// import "./style.css"; // Import the custom CSS file
// import VideoJS from "./Video";
// function VideoPlayerPage() {
//   const playerRef = React.useRef(null);

//   const videoJsOptions = {
//     autoplay: true,
//     controls: true,
//     responsive: true,
//     fluid: true,
//     sources: [
//       {
//         src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
//         type: "video/mp4",
//       },
//     ],
//   };

//   const handlePlayerReady = (player) => {
//     playerRef.current = player;

//     // You can handle player events here, for example:
//     player.on("waiting", () => {
//       console.log("player is waiting");
//     });

//     player.on("dispose", () => {
//       console.log("player will dispose");
//     });
//   };
//   return (
//     <>
//       <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
//     </>
//   );
// }

// export default VideoPlayerPage;

import React, { useEffect, useRef, useState } from "react";
import backward from "./backward.svg";
import forward from "./forward.svg";
import "./style.css"; // Import the custom CSS file
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Forward10Icon from "@mui/icons-material/Forward10";
import { BASEURL } from "../../../ApiUrl";
const VideoPlayerPage = () => {
  const { Id } = useParams();
  console.log(Id);
  const playerRef = useRef(null);
  // const [video, setVideo] = useState({
  //   src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  //   poster:
  //     "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
  // });
  const [video, setVideo] = useState();
  const onPlayerReady = (player) => {
    console.log("Player is ready: ", player);
    playerRef.current = player;
  };

  const onVideoPlay = (duration) => {
    console.log("Video played at: ", duration);
  };

  const onVideoPause = (duration) => {
    console.log("Video paused at: ", duration);
  };

  const onVideoTimeUpdate = (duration) => {
    console.log("Time updated: ", duration);
  };

  const onVideoSeeking = (duration) => {
    console.log("Video seeking: ", duration);
  };

  const onVideoSeeked = (from, to) => {
    console.log(`Video seeked from ${from} to ${to}`);
  };

  const onVideoEnd = () => {
    console.log("Video ended");
  };
  useEffect(() => {
    // Function to handle window resize and update video player dimensions
    const handleResize = () => {
      const playerWrapper = document.getElementById("video-player-wrapper");
      if (playerWrapper) {
        const { width, height } = playerWrapper.getBoundingClientRect();
        setVideoDimensions(width, height);
      }
    };

    // Set initial video player dimensions on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const onPlay = () => {
    setIsPlaying(true);
  };
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const onPause = () => {
    setIsPlaying(false);
  };

  const onPlayButtonClick = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };
  const setVideoDimensions = (width, height) => {
    // You can adjust the scaling factor as needed for your layout
    const scalingFactor = 0.8;
    const maxWidth = 1280; // Set a maximum width to prevent overly large videos
    const newWidth = Math.min(maxWidth, width * scalingFactor);
    const newHeight = (newWidth / 16) * 9; // Maintain the video's aspect ratio (16:9)

    setVideo((prevVideo) => ({
      ...prevVideo,
      width: `${newWidth}px`,
      height: `${newHeight}px`,
    }));
  };
  const handleForward10Seconds = () => {
    videoRef.current.currentTime += 10;
  };

  const handleBackward10Seconds = () => {
    videoRef.current.currentTime -= 10;
  };
  const getData = async () => {
    try {
      // const endpoint1="/api/movie/getSpecificMovie";
      // const endpoint2="/api/episode/getSpecificMovie"
      const result = await axios.post(
        `${BASEURL}/api/episode/getSpecificVideo`,
        {
          Id,
        }
      );
      if (result.status == 200) {
        console.log(result);
        setVideo(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    // <div id="video-player-wrapper">
    //   {/* <VideoPlayer1
    //     controls={true}
    //     src={video.src}
    //     poster={video.poster}
    //     width={video.width}
    //     height={video.height}
    //     onReady={onPlayerReady}
    //     onPlay={onVideoPlay}
    //     onPause={onVideoPause}
    //     onTimeUpdate={onVideoTimeUpdate}
    //     onSeeking={onVideoSeeking}
    //     onSeeked={onVideoSeeked}
    //     onEnd={onVideoEnd}
    //   /> */}
    //   <div
    //     style={{
    //       position: "relative",
    //       padding: "56.25% 0 0 0",
    //       width: "100%",
    //       display: "flex",
    //       justifyContent: "center",
    //     }}
    //   >
    //     {/* The padding-top value of 56.25% maintains the 16:9 aspect ratio */}
    //     <video
    //       src={video.src}
    //       controls
    //       style={{
    //         position: "absolute",
    //         top: 80,
    //         left: 0,
    //         width: "90%",
    //         height: "90%",
    //       }}
    //     />
    //   </div>
    //   {/* <video src={video.src} controls /> */}
    // </div>

    <div
      id="video-player-wrapper"
      style={{
        position: "relative",
        width: "100vw", // Full screen width
        height: "100vh", // Full screen height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "56.25%", // 16:9 aspect ratio
        }}
      >
        {/* The padding-top value of 56.25% maintains the 16:9 aspect ratio */}
        <video
          ref={videoRef}
          src={`${BASEURL}/${video?.movieUrl}`}
          // poster={video.poster}
          autoPlay={false}
          controls
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          onPlay={onPlay}
          onPause={onPause}
        />
        {!isPlaying && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
              fontSize: "40px",
            }}
            onClick={onPlayButtonClick}
          >
            &#9658;
          </div>
        )}
        {/* Custom control bar */}
        {videoRef.current && videoRef.current.controls && (
          <div
            style={{
              position: "absolute",
              bottom: "4%",
              left: "0",
              width: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              color: "white",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px",
            }}
          >
            {/* Add your custom controls here */}
            <div
              style={{ marginRight: "5px", cursor: "pointer" }}
              onClick={handleBackward10Seconds}
            >
              <img src={backward} width={40} height={40} alt="Backward 10s" />
            </div>
            <div style={{ cursor: "pointer" }} onClick={handleForward10Seconds}>
              <img src={forward} width={40} height={40} alt="Forward 10s" />
            </div>
          </div>
        )}

        {/* Video title */}
        <div
          style={{
            position: "absolute",
            // bottom: "10px",
            top: "3%",
            right: "0%",
            transform: "translateX(-50%)",
            fontSize: "16px",
            color: "white",
          }}
        >
          {video?.title}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
