import React, { useState } from "react";
import "./Episodes.css";
import ReactShowMoreText from "react-show-more-text";
// import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { BASEURL } from "../../../ApiUrl";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../../redux/features/globalLoadingSlice";
const Episodes = ({ mediaId }) => {
  console.log(mediaId);
  const videoRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [seasonData, setSeasonData] = useState(null);

  const dispatch = useDispatch();
  //for calulating total time of episodes................................................
  const formatTime = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}hr ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const handleLoadedMetadata = () => {
    // Get the video duration in seconds
    const durationInSeconds = videoRef.current.duration;

    // Convert duration to human-readable format (HH:mm:ss)
    const formattedDuration = formatTime(durationInSeconds);

    // Update state with the video duration
    setVideoDuration(formattedDuration);
  };
  //................................................................................
  const handleSeasonChange = (event) => {
    const selectedSeasonValue = parseInt(event.target.value);
    setSelectedSeason(selectedSeasonValue);
  };
  const getData = async () => {
    dispatch(setGlobalLoading(true));
    try {
      const result = await axios.post(`${BASEURL}/api/series/getSeriesData`, {
        seriesId: mediaId,
      });
      console.log(result);
      setSeasonData(result.data.series);
      dispatch(setGlobalLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [mediaId]);
  const selectedSeasonData = seasonData?.find(
    (seasonData) => seasonData.season === selectedSeason
  );
  const episodes = selectedSeasonData ? selectedSeasonData.episode : [];
  return (
    <div className="container-mains">
      <div>
        {" "}
        <div className="heading-div">
          <h2 className="heading">Episodes</h2>
          <div className="mt-5">
            {
              episodes.length ? <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                value={selectedSeason}
                onChange={handleSeasonChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {seasonData?.map((seasonData) => {
                  return (
                    <MenuItem key={seasonData.season} value={seasonData.season}>
                       Season {seasonData.season} ({episodes.length} episodes)
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>:null
            }
           
          </div>
        </div>
        {
          episodes.length ? <div className="eighteen mt-5">
          <p>Season {selectedSeasonData?.season}: </p>
          <p className="eighteenplus eighteenplus-margin">18+</p>
          <p className="margin">
            Violence, sex, nudity, language, substance, suicide, self-harm
          </p>
        </div>:<div className="eighteen mt-5">
          <p className="margin">
           Currently no season published
          </p>
        </div>
        }
       
      </div>
      {episodes?.map((item, index) => {
        return (
          <div key={index} className="episode">
            {/* <h3 className="number">{index + 1}</h3> */}
            <video
              ref={videoRef}
              src={`${BASEURL}/${item.videoUrl}`}
              controls
              onLoadedMetadata={handleLoadedMetadata}
              className="video"
            ></video>
            <div className="title-div">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="title">{item.title}</p>
                <p className="title">{videoDuration}</p>
              </div>
              <ReactShowMoreText lines={2}>
                <p>
                 {item.description}
                </p>
              </ReactShowMoreText>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Episodes;
