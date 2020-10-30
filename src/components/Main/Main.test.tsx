import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Main } from "./index";

import "../../setupTests";
import configureStore, { MockStore } from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState } from "../../stores/reducers/AddressReducer";
import * as geocode from "../../services/geocode";
import { Provider } from "react-redux";
jest.mock("../../services/geocode");
const mockedApi = geocode as jest.Mocked<typeof geocode>;
const mockStore = configureStore([thunk]);
let store: MockStore<any, any>;
beforeAll(() => {
  store = mockStore({
    address: initialState,
  });
});

describe("Test Main Component", () => {
  it("search name then set searchAdress state", (done) => {
    mockedApi.getGeocode.mockReturnValue(
      Promise.resolve({
        status: 200,
        statusText: "Ok",
        config: {},
        headers: {},
        data: {
          results: [
            {
              formatted_address: "California",
              geometry: {
                location: {
                  lat: 1,
                  lng: 1,
                },
              },
            },
          ],
        },
      })
    );
    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    const searchButton = screen.getByText("SEARCH");
    const inputAddressName = screen.getByLabelText("Name");

    fireEvent.change(inputAddressName, { target: { value: "California" } });
    fireEvent.click(searchButton);

    setTimeout(() => {
      const result = store
        .getActions()
        .find((a) => a.type === "address/searcAddress/set");
      expect(result).not.toBeUndefined();
      done();
    }, 50);
  });
});
