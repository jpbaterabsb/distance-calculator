import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import "./setupTests";

describe("Test App Component", () => {
  it("Verify render", () => {
    render(<App />);
    const searchButton = screen.getByText("SEARCH");
    const inputAddressName = screen.getByLabelText("Name");
    expect(searchButton).toBeInTheDocument();
    expect(inputAddressName).toBeInTheDocument();
  });
});
