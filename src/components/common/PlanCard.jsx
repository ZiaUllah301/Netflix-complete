import React from "react";
import { Card, CardContent, Typography, Box } from "@material-ui/core";
import tick from "../../pages/tick.svg";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
function PlanCard({ content, id, classes, expandedCardId, handleCardClick }) {
  console.log(content);
  return (
    <Grid
      item
      xs={12}
      md={3}
      style={{ marginTop: expandedCardId === id ? "0px" : "25px" }}
    >
      <Card
        variant="outlined"
        style={{
          cursor: "pointer",
          border:
            expandedCardId === id
              ? "2px solid rgba(128, 128, 128, 0.7)"
              : "1px solid rgba(128, 128, 128, 0.4)",
          borderRadius: "18px",
        }}
        onClick={() => handleCardClick(id)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "7px",
            height: "120px",
            padding: "12px 20px",
            borderRadius: "10px",
            // flexDirection: "flex-start",
            alignItems: "flex-start",
            justifyContent: "center",
            background:
              "radial-gradient(140.76% 131.96% at 100% 100%, rgb(229, 9, 20) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)",
          }}
        >
          <CardHeader
            style={{
              padding: "0px",
              fontWeight: "500",
              fontSize: "1.5rem",
              color: "white",
            }}
            title={content.title}
            className={classes.cardHeader}
          ></CardHeader>
          <CardHeader
            style={{
              padding: "0px",
              fontWeight: "500",
              fontSize: "1.25rem",
              color: "rgba(255, 255, 255, 0.7)",
            }}
            title={content.price}
            className={classes.cardHeader}
          ></CardHeader>
        </div>
        <CardContent>
          <Box px={1}>
            <div style={{ display: "flex ", alignItems: "center" }}>
              <div style={{ marginRight: "13px" }}>
                <img src={tick} alt="" />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "self-start",
                }}
              >
                <Typography
                  style={{
                    color: "rgb(118, 118, 118)",
                    fontWeight: "500",
                    fontSize: "0.8125rem",
                  }}
                  color="textSecondary"
                  variant="subtitle1"
                  component="p"
                >
                  {content.benefit1}
                </Typography>
                <Typography
                  style={{
                    color: "rgba(0, 0, 0, 0.7)",
                    fontWeight: "500",
                    fontSize: "1rem",
                  }}
                  color="textSecondary"
                  variant="subtitle1"
                  component="p"
                >
                  {content.benefit2}
                </Typography>
              </div>
            </div>

            <hr />
            <div style={{ display: "flex ", alignItems: "center" }}>
              <div style={{ marginRight: "13px" }}>
                <img src={tick} alt="" />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "self-start",
                }}
              >
                <Typography
                  style={{
                    color: "rgb(118, 118, 118)",
                    fontWeight: "500",
                    fontSize: "0.8125rem",
                  }}
                  color="textSecondary"
                  variant="subtitle1"
                  component="p"
                >
                  {content.benefit3}
                </Typography>
                <Typography
                  style={{
                    color: "rgba(0, 0, 0, 0.7)",
                    fontWeight: "500",
                    fontSize: "1rem",
                  }}
                  color="textSecondary"
                  variant="subtitle1"
                  component="p"
                >
                  {content.benefit4}
                </Typography>
              </div>
            </div>
            <hr />
            <div style={{ display: "flex ", alignItems: "center" }}>
              <div style={{ marginRight: "13px" }}>
                <img src={tick} alt="" />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "self-start",
                }}
              >
                <Typography
                  style={{
                    color: "rgb(118, 118, 118)",
                    fontWeight: "500",
                    fontSize: "0.8125rem",
                  }}
                  color="textSecondary"
                  variant="subtitle1"
                  component="p"
                >
                  {content.benefit5}
                </Typography>
                <Typography
                  style={{
                    color: "rgba(0, 0, 0, 0.7)",
                    fontWeight: "500",
                    fontSize: "1rem",
                  }}
                  color="textSecondary"
                  variant="subtitle1"
                  component="p"
                >
                  {content.benefit6}
                </Typography>
              </div>
            </div>
          </Box>
        </CardContent>
        {expandedCardId === id && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              style={{ marginRight: "4px" }}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="default-ltr-cache-12z0wuy e1mhci4z1"
              data-name="Checkmark"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.4696 3.46973L14.5303 4.53039L6.53026 12.5304C6.23737 12.8233 5.7625 12.8233 5.4696 12.5304L1.4696 8.53039L2.53026 7.46973L5.99993 10.9394L13.4696 3.46973Z"
                fill="rgb(118, 118, 118)"
              ></path>
            </svg>
            <p
              style={{
                color: "rgb(118, 118, 118)",
                fontWeight: "500",
                fontSize: "0.875",
              }}
            >
              Selected
            </p>
          </div>
        )}
      </Card>
    </Grid>
  );
}

export default PlanCard;
