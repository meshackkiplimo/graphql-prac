import Link from "next/link";
import { useState, Fragment } from "react";
import styled from "styled-components";
import Box from "@component/Box";
import Rating from "@component/rating";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button as DefaultButton } from "@component/buttons";
import NextImage from "@component/NextImage";
import { IconButton } from "@component/buttons";
import { H4, Paragraph, Small } from "@component/Typography";
import ProductQuickView from "@component/products/ProductQuickView";
import { useAppContext } from "@context/app-context";
import { HiArrowLongRight } from "react-icons/hi2";

const CardBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "200px",
  height: "300px",
  padding: "16px",
  transition: "all 0.3s",
  borderRadius: "16px",
  background: "#FFF",
  border: "1px solid #D8E0E9",
  "&:hover": {
    ".product-img": {
      transform: "scale(1.1)",
    },
  },
  overflow: "hidden",
}));

const CardMedia = styled(Box)(({ theme }) => ({
  width: "100%",
  maxHeight: "300px",
  cursor: "pointer",
  // overflow: "hidden",
  position: "relative",
  marginBottom: "15px",
  ".product-img": {
    transition: "0.3s",
    width: "100%",
    height: "100%",
  },
}));

const EyeButton = styled(IconButton)(() => ({
  top: "-5px",
  right: "20px",
  position: "absolute",
  transition: "right 0.3s .1s",
  background: "transparent",
}));

const FavoriteButton = styled(IconButton)(() => ({
  top: "35px",
  right: "20px",
  position: "absolute",
  background: "transparent",
  transition: "right 0.3s .2s",
}));

const StyledH4 = styled(H4)`
  color: #808390;
  font-family: "Open Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.5px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 8px 0;
`;

const StyledH5 = styled(H4)`
  color: #000;
  font-family: "Open Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.5px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 8px 0;
`;

const StyledButton = styled(DefaultButton)`
  display: flex;
  text-align: left;
  padding: 4px 12px; /* Reduced padding */
  justify-content: center;
  align-items: center;
  gap: 5px;
  align-self: stretch;
  border-radius: 4px;
  //width: 80px; /* Reduced width */
  height: 20px; /* Reduced height */
  background-color: #f8f8f8;
  color: #7D879C
  transition: background-color 0.3s, color 0.3s;

  span {
    color: #7D879C;
    text-align: center;
    font-family: "Open Sans";
    font-size: 10px; /* Reduced font size */
    font-style: normal;
    font-weight: 300;
  }
`;

const StyledImage = styled(NextImage)`
  width: 73px;
  height: 73px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;

const StyledParagraph = styled(Paragraph)`
  color: #2a2b2d;
  font-family: "Open Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: var(--Title-Medium-Line-Height, 24px);
  letter-spacing: var(--Title-Medium-Tracking, 0.15px);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  &:hover::after {
    content: attr(data-fulltext);
    position: absolute;
    background: #fff;
    border: 1px solid #ccc;
    padding: 4px 8px;
    z-index: 10;
    white-space: normal;
    max-width: 250px;
    left: 0;
    top: calc(100% + 4px);
    box-sizing: border-box;
    width: fit-content;
    min-width: 100%;
  }
`;

const LearnMoreWrapper = styled.div`
  display: flex;
  margin-top: 35px;
  align-items: center;
  gap: 8px; /* Reduced gap */
`;

const horizontalLine = styled.hr`
  margin: 36px 0;
  background-color: red;
  height: 10px;
`;
type ListingCardProps = {
  name?: string;
  slug?: string;
  referenceNumber?: string;
  tags?: string[];
  id?: string | number;
};

export default function ListingCard(props: ListingCardProps) {
  const { name, slug, referenceNumber, tags, id } = props;

  const { state, dispatch } = useAppContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const cartItem = state.cart.find((item) => item.slug === slug);

  const handleFavorite = () => setIsFavorite((fav) => !fav);
  const toggleDialog = () => setOpenDialog((state) => !state);

  return (
    <Fragment>
      <CardBox>
        <Box textAlign="left">
          <StyledParagraph data-fulltext={name}>
            {name || "Julius Baer (Middle East) Limited"}
          </StyledParagraph>
          <Box display="flex" justifyContent="space-between" flexWrap="wrap">
            {" "}
            {/* Replaced gap with margin for spacing */}
            {tags?.map((tag) => (
              <StyledButton mt={3}>
                <span>{tag}</span>
              </StyledButton>
            ))}
          </Box>
          <hr
            style={{
              margin: "36px 0",
              backgroundColor: "#D8E0E9",
              height: "1px",
              border: "none",
            }}
          />
          <StyledH4 fontWeight={400}>Reference Number</StyledH4>

          <StyledH5 fontWeight={500}>{referenceNumber || "F000001"}</StyledH5>

          <Link href={`/product/${slug}`} style={{ textDecoration: "none" }}>
            <LearnMoreWrapper style={{ cursor: "pointer" }}>
              <Paragraph color="#9B1823" fontSize="14px" fontWeight={500}>
                {" "}
                {/* Reduced font size */}
                View Details
              </Paragraph>
              <HiArrowLongRight color="#9B1823" size={24} />
            </LearnMoreWrapper>
          </Link>
        </Box>
      </CardBox>
    </Fragment>
  );
}
