import React from "react";
import { Button as ButtonStyle } from "./styles";

export const theme: Record<string, Theme> = {
  primary: {
    default: "#3f51b5",
    hover: "#283593",
  },
  green: {
    default: "#1ee963",
    hover: "#14ad57",
  },
};

type Theme = {
  default: string;
  hover: string;
};

type ButtonProps = {
  theme: Theme;
  value?: string;
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  style?: React.CSSProperties;
};

export const Button: React.FC<ButtonProps> = ({
  theme,
  value,
  onClick,
  style,
}) => (
  <ButtonStyle style={style} onClick={onClick} theme={theme}>
    {value}
  </ButtonStyle>
);
