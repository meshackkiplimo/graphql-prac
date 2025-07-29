import styled from "styled-components";
import Box from "@component/Box";
import { getTheme } from "@utils/utils";

const StyledProductCategory = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  cursor: pointer;
  width: 280px;
  border-radius: 5px;
  padding: 0.5rem;
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
    margin-left: 10px;
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
    background:white;
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
    background: #D8E0E9;
`;

export { StyledProductCategory, StyledRangeInput, HrSeparator };
