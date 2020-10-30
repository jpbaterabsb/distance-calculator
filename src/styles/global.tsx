import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  *:focus {
    outline: 0;
  }
  html, body, #root {
    -webkit-font-smoothing: antialiased !important;
    /* background: linear-gradient(152.35deg, #4cc8f2 2.62%, #783cbd 129.99%) fixed; */
    height: 100%;
  }
  body {
    background-size: cover;
  }
  body, input, button {
    font: 14px 'Roboto', sans-serif;
    &:focus {
      outline: 0;
    }
  }
  a {
    text-decoration: none;
    &:hover {
      color: inherit;
      text-decoration: none;
    }
  }
  ul {
    list-style: none;
  }
  button {
    cursor: pointer;
  }
`;
