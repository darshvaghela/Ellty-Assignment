import { createGlobalStyle } from "styled-components";

export const theme = {
  primary: "#008060",
  secondary: "#008060",
  black: "#000000",
  borderRadius: 4,
  fontFamily: "'Montserrat', sans-serif",
};

//put all theme variables in global style as well to use in index.css or any other css file as variable
export const GlobalStyles = createGlobalStyle`html {
    --primary: ${theme.primary};
    --secondary: ${theme.secondary};
    --black: ${theme.black};
  }`;
