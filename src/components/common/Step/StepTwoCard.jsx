import React, { useState } from "react";
import {
  Check,
  Computer,
  StayPrimaryPortrait,
  Tablet,
} from "@mui/icons-material";
import "./StepTwoCard.css";
import { useNavigate } from "react-router-dom";

const StepTwoCard = () => {
  const [deviceName, setDeviceName] = useState("");
  const navigate = useNavigate();
  const handlePlaneChange = (item) => {
    console.log(item);
    setDeviceName(item);
  };

  const isSelected = (item) => deviceName === item;

  return (
    <div className="container">
      <div>
        <p>STEP 2 OF 3</p>
        <h2>Choose the plan that's right for you</h2>
        <div className="caption-check">
          <Check
            color={isSelected("mobile") ? "red" : "inherit"}
            className="check-icon"
          />
          <p className="caption-text">Watch all you want. Ad-free.</p>
        </div>
        <div className="caption-check">
          <Check
            color={isSelected("mobile") ? "red" : "inherit"}
            className="check-icon"
          />
          <p className="caption-text">Recommendations just for you.</p>
        </div>
        <div className="caption-check">
          <Check
            color={isSelected("mobile") ? "red" : "inherit"}
            className="check-icon"
          />
          <p className="caption-text">Change or cancel your plan anytime.</p>
        </div>
        <div className="plane-container">
          <div
            onClick={() => handlePlaneChange("mobile")}
            className={`plan-card ${
              isSelected("mobile") ? "selected-card" : ""
            }`}
          >
            Mobile
          </div>
          <div
            onClick={() => handlePlaneChange("basic")}
            className={`plan-card ${
              isSelected("basic") ? "selected-card" : ""
            }`}
          >
            Basic
          </div>
          <div
            onClick={() => handlePlaneChange("standard")}
            className={`plan-card ${
              isSelected("standard") ? "selected-card" : ""
            }`}
          >
            Standard
          </div>
          <div
            onClick={() => handlePlaneChange("premium")}
            className={`plan-card ${
              isSelected("premium") ? "selected-card" : ""
            }`}
          >
            Premium
          </div>
        </div>
        <div className="price-lable">
          <p className="Monthly">Video Quality</p>
          <div className="price">
            <p className={`tag ${isSelected("mobile") ? "selected" : ""}`}>
              Good
            </p>
            <p className={`tag ${isSelected("basic") ? "selected" : ""}`}>
              Good
            </p>
            <p className={`tag ${isSelected("standard") ? "selected" : ""}`}>
              Better
            </p>
            <p className={`tag ${isSelected("premium") ? "selected" : ""}`}>
              Best
            </p>
          </div>
        </div>

        <div className="price-lable">
          <p className="Monthly">Resolution</p>
          <div className="price">
            <p className={`tag ${isSelected("mobile") ? "selected" : ""}`}>
              480p
            </p>
            <p className={`tag ${isSelected("basic") ? "selected" : ""}`}>
              720p
            </p>
            <p className={`tag ${isSelected("standard") ? "selected" : ""}`}>
              1080p
            </p>
            <p className={`tag ${isSelected("premium") ? "selected" : ""}`}>
              4K+HDR
            </p>
          </div>
        </div>

        <div className="price-lable">
          <p className="Monthly">Monthly Price</p>
          <div className="price">
            <p className={`tag ${isSelected("mobile") ? "selected" : ""}`}>
              Rs250
            </p>
            <p className={`tag ${isSelected("basic") ? "selected" : ""}`}>
              Rs450
            </p>
            <p className={`tag ${isSelected("standard") ? "selected" : ""}`}>
              Rs800
            </p>
            <p className={`tag ${isSelected("premium") ? "selected" : ""}`}>
              Rs1,100
            </p>
          </div>
        </div>

        <div className="price-lable device-container">
          <p className="Monthly">Device you can use to watch</p>
          <div className="price">
            <p className={`tag ${isSelected("mobile") ? "selected" : ""}`}>
              <StayPrimaryPortrait className="device" />
              <p className="device-name">Phone</p>
            </p>
            <p className={`tag ${isSelected("basic") ? "selected" : ""}`}>
              <StayPrimaryPortrait className="device" />
              <p className="device-name">Phone</p>
            </p>
            <p className={`tag ${isSelected("standard") ? "selected" : ""}`}>
              <StayPrimaryPortrait className="device" />
              <p className="device-name">Phone</p>
            </p>
            <p className={`tag ${isSelected("premium") ? "selected" : ""}`}>
              <StayPrimaryPortrait className="device" />
              <p className="device-name">Phone</p>
            </p>
          </div>
        </div>

        <div className="price-lable device-container">
          <p className="Monthly"></p>
          <div className="price">
            <p className={`tag ${isSelected("mobile") ? "selected" : ""}`}>
              <Tablet className="device" />
              <p className="device-name">Tablet</p>
            </p>
            <p className={`tag ${isSelected("basic") ? "selected" : ""}`}>
              <Tablet className="device" />
              <p className="device-name">Tablet</p>
            </p>
            <p className={`tag ${isSelected("standard") ? "selected" : ""}`}>
              <Tablet className="device" />
              <p className="device-name">Tablet</p>
            </p>
            <p className={`tag ${isSelected("premium") ? "selected" : ""}`}>
              <Tablet className="device" />
              <p className="device-name">Tablet</p>
            </p>
          </div>
        </div>

        <div className="price-lable device-container">
          <p className="Monthly"></p>
          <div className="price">
            <p className="tag">
              <p className="device-name"></p>
            </p>
            <p className={`tag ${isSelected("basic") ? "selected" : ""}`}>
              <Computer className="device" />
              <p className="device-name">Computer</p>
            </p>
            <p className={`tag ${isSelected("standard") ? "selected" : ""}`}>
              <Computer className="device" />
              <p className="device-name">Computer</p>
            </p>
            <p className={`tag ${isSelected("premium") ? "selected" : ""}`}>
              <Computer className="device" />
              <p className="device-name">Computer</p>
            </p>
          </div>
        </div>

        <p>
          HD (720p), Full HD (1080p), Ultra HD (4K), and HDR availability are
          subject to your internet service and device capabilities. Not all
          content is available in all resolutions. See our{" "}
          <span className="term">Terms of Use</span> for more details.
        </p>
        <p>
          Only people who live with you may use your account. Watch on 4
          different devices at the same time with Premium, 2 with Standard, and
          1 with Basic and Mobile.
        </p>
        <div className="button-div">
          <button
            onClick={() => navigate("/StepThree")}
            className="button-next button-card"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepTwoCard;
