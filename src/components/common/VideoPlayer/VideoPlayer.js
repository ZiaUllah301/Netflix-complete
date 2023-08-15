import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import qualitySelector from "@silvermine/videojs-quality-selector";
import "@silvermine/videojs-quality-selector/dist/css/quality-selector.css";
import "video.js/dist/video-js.css";

const VideoPlayer = (props) => {
  const videoRef = useRef(null);
  console.log(videoRef);
  const { sources, title, onClose } = props;
  console.log(props);
  useEffect(() => {
    let player;
    if (videoRef.current) {
      // Register the qualitySelector plugin globally
      if (!videojs.getPlugin("qualitySelector")) {
        videojs.registerPlugin("qualitySelector", qualitySelector);
      }

      player = videojs(videoRef.current, {
        sources,
        controlBar: {
          children: [
            "playToggle",
            "volumePanel",
            "currentTimeDisplay",
            "timeDivider",
            "durationDisplay",
            "progressControl",
            "qualitySelector",
            "fullscreenToggle",
          ],
        },
      });
      // Add custom control bar components
      const backButton = player.controlBar.addChild("Button");
      backButton.addClass("back-btn");
      backButton.el().innerHTML = "Close Video";
      backButton.on("click", onClose);

      const titleComponent = player.controlBar.addChild("Component");
      titleComponent.addClass("video-player-title");
      titleComponent.el().innerHTML = title;
    }

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [sources, title, onClose]);

  return (
    <div className="video-player-container">
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered vjs-theme-tunflix"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
