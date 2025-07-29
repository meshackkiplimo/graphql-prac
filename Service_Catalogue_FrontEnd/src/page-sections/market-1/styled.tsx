import styled from "styled-components";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import { getTheme } from "@utils/utils";

const StyledProductCategory = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  cursor: pointer;
  width: 280px;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  // &:hover {
  //   box-shadow: ${getTheme("shadows.4")};
  // }
  .product-category-title {
    font-size: 16px;
    font-weight: 300;
    margin-left: 1rem;
    text-transform: capitalize;
  }

  .show-all {
    width: 100%;
    font-size: 16px;
    text-align: center;
  }
  .accordion_summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .accordion_children {
    margin-left: 24px;
  }
  .accordion_child {
    font-size: 15px;
    font-weight: 400;
  }
`;

// New Styled Range Input
const StyledRangeInput = styled.input`
  -webkit-appearance: none; /* Override default CSS styles */
  width: 100%; /* Full-width */
  height: 8px; /* Height of the track */
  background: rgba(184, 41, 50, 0.16); /* Background color of the track */
  border-radius: 5px; /* Rounded corners */

  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default styles */
    appearance: none;
    width: 20px; /* Width of the thumb */
    height: 20px; /* Height of the thumb */
    border: 4px solid #b82932; /* Color of the thumb */
    background: white;
    border-radius: 50%; /* Round thumb */
    cursor: pointer; /* Pointer cursor on hover */
  }

  &::-moz-range-thumb {
    width: 20px; /* Width of the thumb */
    height: 20px; /* Height of the thumb */
    background: #b82932; /* Color of the thumb */
    border-radius: 50%; /* Round thumb */
    cursor: pointer; /* Pointer cursor on hover */
  }

  &::-ms-thumb {
    width: 20px; /* Width of the thumb */
    height: 20px; /* Height of the thumb */
    background: #b82932; /* Color of the thumb */
    border-radius: 50%; /* Round thumb */
    cursor: pointer; /* Pointer cursor on hover */
  }
`;
const HrSeparator = styled.div`
  width: 100%;
  height: 1px;
  background: #d8e0e9;
`;

const ChatbotLauncher = styled(FlexBox)`
  position: fixed;
  top: 50%;
  right: 24px; /* adjust distance from right edge */
  transform: translateY(-50%);
  z-index: 9999;
  width: 96px;
  height: 96px;
  flex-shrink: 0;
  align-items: center;
  gap: 0.2rem;
  justify-content: center;
  background-color: rgba(155, 24, 35, 0.9);
  color: white;
  border-radius: 61.538px;
  border: 1.846px solid rgba(155, 24, 35, 1);
  box-shadow: 0px 2.462px 16px 0px rgba(155, 24, 35, 0.5),
    0px 0px 20px 0px rgba(255, 255, 255, 0.2) inset;
`;

export {
  StyledProductCategory,
  StyledRangeInput,
  HrSeparator,
  ChatbotLauncher,
};
