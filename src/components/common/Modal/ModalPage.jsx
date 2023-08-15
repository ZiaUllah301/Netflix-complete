import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import "./ModalPage.css"; // Import your custom CSS file
// import v4 from "../assets/v2.mp4";
import {
  Check,
  HdTwoTone,
  InsertCommentTwoTone,
  PauseCircleOutlineOutlined,
  PlayCircle,
  ThumbUp,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import Episodes from "./Episodes";
import { Modal } from "react-bootstrap";
const ModalPage = () => {
  const [showModal, setShowModal] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsVideoPlaying(true);
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  const handleVolume = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <>
      <Button variant="primary" onClick={openModal}>
        Large modal
      </Button>

      <Modal show={showModal} onHide={closeModal} size="xl" centered>
        <Modal.Body>
          <div className="video-background">
            <div className="modal-header-container">
              <Modal.Header
                closeButton
                className="custom-modal-header header-custom"
              ></Modal.Header>
            </div>
            <video
              ref={videoRef}
              className="video-element"
              controls={isVideoPlaying}
            >
              <source
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
            </video>
            <div className="main-div-top">
              {/* Video Information */}
              <div className="container-main">
                <p className="move-name">The Witcher</p>
                <div className="main-div">
                  {/* Play/Pause Button */}
                  <div className="button-container">
                    <button className="play-button" onClick={handlePlayPause}>
                      {isVideoPlaying ? (
                        <>
                          <PauseCircleOutlineOutlined />
                          <p>Resume</p>
                        </>
                      ) : (
                        <>
                          <PlayCircle className="playCircle" />
                          <p>Play</p>
                        </>
                      )}
                    </button>
                    {/* Check and Thumb Up Buttons */}
                    <div className="div-button">
                      <div className="check">
                        <Check />
                      </div>
                      <div className="check">
                        <ThumbUp />
                      </div>
                      {/* Volume Button */}
                      <div className="vol-button-div">
                        <div className="check">
                          {isMuted ? (
                            <VolumeOff onClick={handleVolume} />
                          ) : (
                            <VolumeUp onClick={handleVolume} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Details */}
              <div className="background-main-div">
                <div className="col-lg-8">
                  {/* Match and Season Information */}
                  <div className="match">
                    <p className="">99% Match</p>
                    <span className="margin">2023</span>
                    <span className="margin">3 Seasons</span>
                    <HdTwoTone className="margin HD" />
                    <span className="margin">AD</span>
                    <InsertCommentTwoTone className="margin HD" />
                  </div>
                  {/* Age Restriction */}
                  <div className="eighteen">
                    <p className="eighteenplus">18+</p>
                    <p className="margin">
                      Violence, sex, nudity, language, substance, suicide,
                      self-harm
                    </p>
                  </div>
                  {/* Top 10 */}
                  <div className="topTen">
                    <p>Top 10</p>
                    <h3>#1 in TV Shows Today</h3>
                  </div>
                  {/* Season and Episode */}
                  <div>
                    <p className="seasonandEpsiod">
                      S1:E1 "The End's Beginning"
                    </p>
                    <p className="caption-seasion">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy
                    </p>
                  </div>
                  <div>
                    <p className="seasonandEpsiod">S1:E2 "Episode Title"</p>
                    <p className="caption-seasion">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy
                    </p>
                  </div>
                </div>
                {/* Cast, Genres, and Show of the Week */}
                <div className="col-lg-4 p-3 mt-5">
                  <div className="d-flex">
                    <p className="cast">Cast:</p>
                    <p className="cast-caption">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </div>
                  <div className="d-flex">
                    <p className="cast">Genres:</p>
                    <p className="cast-caption">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </div>
                  <div className="d-flex">
                    <p className="cast">This Week Show:</p>
                    <p className="cast-caption">Lorem Ipsum is simply</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="video-overlay">
              <Episodes />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalPage;
