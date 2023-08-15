import React from "react";
import { useState, useEffect } from "react";
import { FrontEndUrl } from "../ApiUrl";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import "./styles.css";
function Checkout({}) {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${FrontEndUrl}`,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  return (
    <div>
      <div className="mainscreen">
        {/* <img src="https://image.freepik.com/free-vector/purple-background-with-neon-frame_52683-34124.jpg"  className="bgimg " alt=""> */}
        <div className="card">
          {/* <div className="leftside">
            <img
              src="https://i.pinimg.com/originals/18/9d/dc/189ddc1221d9c1c779dda4ad37a35fa1.png"
              className="product"
              alt="Shoes"
            />
          </div> */}
          <div className="rightside">
            <form onSubmit={handleSubmit}>
              <PaymentElement />
              <button disabled={!stripe}>Submit</button>
              {/* <h2>Payment Information</h2>
              <p>Cardholder Name</p>
              <input type="text" className="inputbox" name="name" required />
              <p>Card Number</p>
              <input
                type="number"
                className="inputbox"
                name="card_number"
                id="card_number"
                required
              />

              <p>Card Type</p>
              <select
                className="inputbox"
                name="card_type"
                id="card_type"
                required
              >
                <option value="">--Select a Card Type--</option>
                <option value="Visa">Visa</option>
                <option value="RuPay">RuPay</option>
                <option value="MasterCard">MasterCard</option>
              </select>
              <div className="expcvv">
                <p className="expcvv_text">Expiry</p>
                <input
                  type="date"
                  className="inputbox"
                  name="exp_date"
                  id="exp_date"
                  required
                />

                <p className="expcvv_text2">CVV</p>
                <input
                  type="password"
                  className="inputbox"
                  name="cvv"
                  id="cvv"
                  required
                />
              </div>
              <p></p>
              <button type="submit" className="button">
                CheckOut
              </button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
