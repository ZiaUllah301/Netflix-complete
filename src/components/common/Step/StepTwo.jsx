import { Check } from "@mui/icons-material";
import React from "react";
import "./StepTwo.css";
import { useNavigate } from "react-router-dom";
const StepTwo = () => {
  const navigate = useNavigate();
  return (
    <div className="container-step">
      <div className="step-main-div">
        <div className="check">
          <Check />
        </div>
        <h2 className="mt-5">Chose Your Plane.</h2>
        <div>
          <div className="caption">
            <Check fontSize="50px" className="ckeck-bg" />
            <p className="">No Commitment's cancle anytime.</p>
          </div>
          <div className="caption">
            <Check fontSize="50px" className="ckeck-bg" />
            <p className="">Everything on Nexflix for one low price.</p>
          </div>
          <div className="caption">
            <Check fontSize="50px" className="ckeck-bg" />
            <p className="">No ads and no extra fees Ever.</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/StepTwoCard")}
          type="submit"
          className="button-next mt-5"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
