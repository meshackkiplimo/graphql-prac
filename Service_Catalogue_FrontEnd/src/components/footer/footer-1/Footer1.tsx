import Link from "next/link";

import Box from "@component/Box";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";

import Container from "@component/Container";
import Typography, { Paragraph } from "@component/Typography";

// STYLED COMPONENTS
import { StyledLink } from "./styles";
// CUSTOM DATA
import { aboutLinks, customerCareLinks, iconList, legalLinks } from "./data";
import { Button } from "@component/buttons";
import { width } from "styled-system";

export default function Footer1() {
  return (
    <footer>
      <Box style={{ background: "linear-gradient(to right, #FCF6F5,#fff)" }}>
        <Container p="1rem" color="white">
          <Box py="5rem" overflow="hidden">
            <Grid container spacing={6}  >
              <Grid item lg={4} md={6} sm={6} xs={12} style={{ width: "40%", }}>
                <Link href="/">
                  <Image
                    alt="logo"
                    mb="1rem"
                    src="/assets/images/DFSA/DFSA_Logo.png"
                  />
                </Link>

                <Paragraph mb="1.25rem" color="black" maxWidth="320px">
                  Stay updated with the latest business insights, opportunities,
                  and services from DFSA.
                </Paragraph>

                <FlexBox>
                  <input
                    type="text"
                    placeholder="Your email"
                    //value=""
                    style={{
                      outline: "none",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "2px solid white",
                      background: "transparent"
                    }}
                  />
                  <Button
                    bg="#9B1823"
                    borderRadius=" 0 0.5rem 0.7rem 0"
                    color="primary"
                    variant="contained"
                    size="medium"
                  >
                    Subscribe
                  </Button>
                </FlexBox>
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12} style={{ width: "20%", }}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  color="black"
                  fontSize={20}
                  fontWeight="600"
                >
                  Quick Links
                </Typography>

                <div>
                  {aboutLinks.map((item, ind) => (
                    <div key={item.name} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <StyledLink href="/" key={ind}>
                        {item.name}
                      </StyledLink>
                      {item.new && <Button
                        bg="#9B1823"
                        borderRadius=" 5px"
                        color="primary"
                        variant="contained"
                        style={{ padding: "1px 10px", height: "25px" }}

                      >
                        New
                      </Button>}</div>
                  ))}

                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12} style={{ width: "20%", }}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  color="black"
                  fontSize={20}
                  fontWeight="600"
                >
                  Get to Know Us
                </Typography>

                <div>
                  {customerCareLinks.map((item, ind) => (
                    <div key={item.name} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <StyledLink href="/" key={ind}>
                        {item.name}
                      </StyledLink>
                      {item.new && <Button
                        bg="#9B1823"
                        borderRadius=" 5px"
                        color="primary"
                        variant="contained"
                        style={{ padding: "1px 10px", height: "25px" }}

                      >
                        New
                      </Button>}</div>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12} style={{ width: "20%", }}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  color="black"
                  fontSize={20}
                  fontWeight="600"
                >
                  Legal
                </Typography>

                <div>
                  {legalLinks.map((item, ind) => (
                    <div key={item.name} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <StyledLink href="/" key={ind}>
                        {item.name}
                      </StyledLink>
                      {item.new && <Button
                        bg="#9B1823"
                        borderRadius=" 5px"
                        color="primary"
                        variant="contained"
                        style={{ padding: "1px 10px", height: "25px" }}

                      >
                        New
                      </Button>}</div>
                  ))}
                </div>
              </Grid>

              <FlexBox
                justifyContent="space-between"
                alignItems="center"
                marginLeft="1rem"
                marginRight="1rem"
                style={{ padding: "1rem 0" }}
              >
                <Paragraph color="black" style={{ marginRight: "5rem" }}>
                  © 2025 DFSA refers to the Dubai Financial Services Authority,
                  a body established under Dubai law as the independent
                  regulator of financial services and related activities for the
                  DIFC.
                </Paragraph>
                <>
                  {iconList.map((item) => (
                    <a
                      href={item.url}
                      target="_blank"
                      key={item.iconName}
                      rel="noreferrer noopenner"
                    >
                      <Box
                        m="5px"
                        p="10px"
                        size="small"
                        borderRadius="50%"
                        bg="rgba(0,0,0,0.2)"
                      >
                        <Icon size="12px" defaultcolor="auto">
                          {item.iconName}
                        </Icon>
                      </Box>
                    </a>
                  ))}
                </>
              </FlexBox>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
