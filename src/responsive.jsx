import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 480px){
      ${props}
    }
  `;
};

export const tab = (props) => {
  return css`
  @media only screen and (min-width: 481px) and (max-width: 768px){
    ${props}
  }
  `;
};

export const laptop = (props) => {
  return css`
  @media only screen and (min-width: 769px) and (max-width: 1024px){
    ${props}
  }
  `;
};

export const desktop = (props) => {
  return css`
  @media only screen and (min-width: 1025px) and (max-width: 1200px){
    ${props}
  }
  `;
};