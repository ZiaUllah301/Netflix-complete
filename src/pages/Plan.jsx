import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Switch from "@material-ui/core/Switch";
import tick from "../pages/tick.svg";
import PlanCard from "../components/common/PlanCard";
import { useState } from "react";
import Navbar from "../components/common/Navbar";
import Checkout from "./Checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import userApi from "../api/modules/user.api";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  section: {
    backgroundImage: 'url("nereus-assets/img/bg/pattern1.png")',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  cardHeader: {
    paddingTop: theme.spacing(0),
  },
}));

export default function Plan(props) {
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [currency, setCurrency] = useState("");
  const [price, setPrice] = useState(0);
  const [options, setOptions] = useState("");

  const handleCardClick = (id) => {
    console.log(id);
    // Toggle the expanded state of the clicked card
    const pricee = contentArray[id].price;
    const currencyy = pricee.match(/[a-zA-Z]+/)[0];
    const numberPart = pricee.split(" ")[1].replace(",", ""); // Output: "1100"
    setExpandedCardId(id);
    setPrice(numberPart);
    setCurrency(currencyy);
    console.log(price, currency);
  };
  const classes = useStyles();

  const contentArray = [
    {
      badge: "LOREM IPSUM",
      "header-p1": "Donec lacinia",
      "header-p2": "turpis non sapien lobortis pretium",
      description: "Choose the plan that’s right for you",
      option1: "Monthly",
      option2: "Annual",
      title: "Premium",
      price: "usd 11",
      suffix: " / mo",
      benefit1: "Monthly price",
      benefit2: "usd 11",
      benefit3: "Resolution",
      benefit4: "4K (Ultra HD) +HDR",
      benefit5: "Video quality",
      benefit6: "Best",
      "primary-action": "Select plan",
      "secondary-action": "Learn more",
    },
    {
      badge: "LOREM IPSUM",
      "header-p1": "Donec lacinia",
      "header-p2": "turpis non sapien lobortis pretium",
      description: "Choose the plan that’s right for you",
      option1: "Monthly",
      option2: "Annual",
      title: "Standard",
      price: "usd 8",
      suffix: " / mo",
      benefit1: "Monthly price",
      benefit2: "usd 8",
      benefit3: "Resolution",
      benefit4: "1080p (Full HD)",
      benefit5: "Video quality",
      benefit6: "Better",
      "primary-action": "Select plan",
      "secondary-action": "Learn more",
    },
    {
      badge: "LOREM IPSUM",
      "header-p1": "Donec lacinia",
      "header-p2": "turpis non sapien lobortis pretium",
      description: "Choose the plan that’s right for you",
      option1: "Monthly",
      option2: "Annual",
      title: "Basic",
      price: "usd 4",
      suffix: " / mo",
      benefit1: "Monthly price",
      benefit2: "usd 4",
      benefit3: "Resolution",
      benefit4: "720p (HD)",
      benefit5: "Video quality",
      benefit6: "Good",
      "primary-action": "Select plan",
      "secondary-action": "Learn more",
    },
    {
      badge: "LOREM IPSUM",
      "header-p1": "Donec lacinia",
      "header-p2": "turpis non sapien lobortis pretium",
      description: "Choose the plan that’s right for you",
      option1: "Monthly",
      option2: "Annual",
      title: "Mobile",
      price: "usd 2",
      suffix: " / mo",
      benefit1: "Monthly price",
      benefit2: "usd 2",
      benefit3: "Resolution",
      benefit4: "480p",
      benefit5: "Video quality",
      benefit6: "Good",
      "primary-action": "Select plan",
      "secondary-action": "Learn more",
    },
  ];
  const stripePromise = loadStripe(
    "pk_test_51MqAR9AaUQ4WyfXOQEq7XO6LKUoTsdTycKGed2oCsthMwjbvOT8GrZNQ4NxklNsO6VIkyeQUjJD5loawReFoHdwd000AEPBns9"
  );

  console.log(options);
  const addpayment = async (req, res) => {
    try {
      const { response, err } = await userApi.makePayment({
        amount: price,
        currency,
      });
      setOptions(response.clientSecret);
      setShowCheckout(!showCheckout);

      console.log(options);
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };

  return (
    <section
      className={classes.section}
      style={{ backgroundColor: "white", height: "100vh" }}
    >
      <Navbar />
      <Container maxWidth="lg">
        {showCheckout ? (
          <Elements stripe={stripePromise} options={{ clientSecret: options }}>
            <Checkout />
          </Elements>
        ) : (
          <>
            <Box py={8} textAlign="center">
              <Box>
                <Container maxWidth="sm">
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    paragraph={true}
                    style={{
                      fontSize: "32px",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    Choose the plan that’s right for you
                  </Typography>
                </Container>
              </Box>
              <Grid container spacing={3}>
                {contentArray.map((cardData, Index) => (
                  <PlanCard
                    key={Index} // Use a unique key for each PlanCard
                    id={Index}
                    content={cardData}
                    classes={classes} // Replace classes with your actual styles
                    expandedCardId={expandedCardId}
                    handleCardClick={handleCardClick}
                  />
                ))}
              </Grid>
            </Box>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  fontSize: "20px",
                  backgroundColor: "#e50914",
                  color: "white",
                  padding: "20px 220px 20px 220px",
                }}
                variant="contained"
                onClick={() => {
                  addpayment();
                }}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
