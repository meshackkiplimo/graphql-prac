import Link from "next/link";

import CategorySectionCreator from "@component/CategorySectionCreator";
import { Fragment } from "react";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import Typography, { Span } from "@component/Typography";
import { Button } from "@component/buttons";
// API FUNCTIONS

export default async function Section3() {
  const serviceFilters = [
    { name: "New Additions", active: true },
    { name: "Top Services", active: false },
    { name: "Popular Picks", active: false },
  ];

  return (
    <Container
      height="100%"
      display="flex"
      flexDirection="column"
      paddingTop={"3rem"}
      paddingBottom={"3rem"}
      justifyContent="space-between"
    >
      {/* <Typography fontSize="2rem" fontWeight="600">
        Find the{" "}
        <Span
          style={{
            fontSize: "2rem",
            color: "#A39161",
            position: "relative",
            textDecoration: "none",
          }}
        >
          service
          <span
            style={{
              position: "absolute",
              left: "12px",
              right: "12px",
              bottom: "-4px",
              height: "4px",
              background: "#B82932",
            }}
          ></span>
        </Span>{" "}
        for you
      </Typography>
      <Typography fontSize="1.25rem" color="text.muted">
        Whether you're an authorised firm, key individual, or consultant, select
        the category that fits your business type.
      </Typography> */}
      <Typography fontSize="2rem" fontWeight="600">
        Services
        <Span
          style={{
            fontSize: "1rem",
            marginLeft: "1rem",
          }}
        >
          40+ Results
        </Span>
      </Typography>
      <FlexBox alignItems="center">
        <Typography flex={2} fontSize="1rem" color="text.muted">
          Explore licensing, compliance, and approval solutions to meet your
          financial regulatory needs.
        </Typography>
        <FlexBox flex={1} style={{ gap: "0.5rem" }}>
          {serviceFilters.map((button) =>
            button.active ? (
              <Button
                bg="white"
                style={{ color: "#9B1823" }}
                minWidth="130px"
                padding="2px"
                variant="contained"
                size="medium"
                border="1px solid #9B1823"
                key={button.name}
              >
                {button.name}
              </Button>
            ) : (
              <Button
                key={button.name}
                bg="white"
                style={{ color: "#2B3445" }}
                minWidth="130px"
                padding="2px"
                variant="contained"
                size="medium"
                border="1px solid #D8E0E9"
              >
                {button.name}
              </Button>
            )
          )}
        </FlexBox>
      </FlexBox>
    </Container>
  );
}
