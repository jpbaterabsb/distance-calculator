import Loader from "react-loader-spinner";
import styled from "styled-components";

export const BigContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: space-around;
  align-items: center;
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

export const Card = styled.div`
  flex-direction: column;
  padding: 20px;
  width: 400px;
  height: 560px;
  background: #fbfbfb;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  .card-item {
    margin: 12px 0px;
  }

  .title {
    font-size: 36px;
  }

  .main-text {
    font-size: 18px;
  }

  .property {
    font-weight: bold;
  }
`;
