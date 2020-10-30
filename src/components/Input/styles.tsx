import styled from "styled-components";

export const Container = styled.div`
  .input-container {
    position: relative;
    input {
      background: transparent;
      border: 0;
      border-bottom: 2px solid #9e9e9e;
      outline: none;
      transition: 0.2s ease-in-out;
      box-sizing: border-box;
    }

    label {
      top: 0;
      left: 0;
      right: 0;
      color: #616161;
      display: flex;
      align-items: center;
      position: absolute;
      font-size: 1rem;
      cursor: text;
      transition: 0.2s ease-in-out;
      box-sizing: border-box;
    }

    input,
    label {
      width: 100%;
      height: 3rem;
      font-size: 1rem;
    }

    /* Interation */
    input:valid,
    input:focus {
      border-bottom: 2px solid #26a69a;
    }

    input:valid + label,
    input:focus + label {
      color: #26a69a;
      font-size: 0.8rem;
      top: -30px;
      pointer-events: none;
    }
  }
`;
