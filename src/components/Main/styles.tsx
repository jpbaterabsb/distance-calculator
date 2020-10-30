import Loader from "react-loader-spinner";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  flex-direction: column;

  .row {
    padding: 18px 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    max-width: 100%;

    input {
      width: 384px;
    }

    @media screen and (max-width: 640px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      input {
        width: 248px;
      }
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;
  }

  .main-text {
    color: #000;
    font: 32px "Roboto", sans-serif;
    font-weight: bold;
    line-height: 32px;
    text-align: center;

    @media screen and (max-width: 640px) {
      font: 22px "Roboto", sans-serif;
      font-weight: bold;
    }
  }
`;

export const ThreeDotsLoader = styled(Loader).attrs({
  type: "ThreeDots",
  color: "#283593",
  height: 100,
  width: 100,
  timeout: 3000,
})`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
