import React from "react";
import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import App from "./App";
import { Main } from "./components/Main";
import "./setupTests";

test("Verify render elements", () => {
  render(<App />);
  const searchButton = screen.getByText("SEARCH");
  const calculateButton = screen.getByText("CALCULATE");
  const inputAddressName = screen.getByLabelText("Name");
  expect(searchButton).toBeInTheDocument();
  expect(calculateButton).toBeInTheDocument();
  expect(inputAddressName).toBeInTheDocument();
  // expect(googleMap).toBeInTheDocument();
});

test("Verify render elements App", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.containsMatchingElement(<Main />)).toBeTruthy();
  // expect(googleMap).toBeInTheDocument();
});
