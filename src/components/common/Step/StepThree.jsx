import { ArrowForward, ArrowForwardIos, Lock } from "@mui/icons-material";
import React from "react";
import "./StepThree.css";
// import pay from "../../assets/pay.png";
const StepThree = () => {
  return (
    <div className="step-three-container">
      <div className="step-three">
        <div className="check">
          <Lock />
        </div>
        <p className="mt-3">STEP 3 OF 3</p>
        <h2>Choose how to pay</h2>
        <p className="text-center">
          Your payment is encrypted and you can change how you pay anytime
        </p>
        <span className="bold">Secure for peace of mind.</span>
        <p className="bold">Cancle easily online.</p>
        <div className="enc">
          <span className="ml-5">End-to-end encrypted</span>
          <Lock fontSize="25px" className="mt-1 lock" />
        </div>
        <div className="payment-div">
          <span className="debit">Credet or Debit Card</span>
          {/* <img src={pay} className="pay" /> */}
          <ArrowForwardIos />
        </div>
      </div>
    </div>
  );
};

export default StepThree;
