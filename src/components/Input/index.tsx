import React from "react";

import { Container } from "./styles";

type OnChange = (e: React.ChangeEvent<HTMLInputElement>) => void | undefined;

interface InputProps {
  label: string;
  type?: string;
  width?: string;
  value?: string;
  onChange?: OnChange;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value = "",
  onChange,
}) => {
  return (
    <Container>
      <div className="input-container">
        <input
          id="name"
          className="input"
          type={type}
          pattern=".+"
          required
          value={value}
          onChange={onChange}
        />
        <label className="label" htmlFor="name">
          {label}
        </label>
      </div>
    </Container>
  );
};
