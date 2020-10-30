import { createReducer } from "@reduxjs/toolkit";
import { LatLng } from "../../services/geocode";
import {
  setDistance,
  setError,
  setLoading,
  setSearchAddress,
  setClickAddress,
} from "../actions/AddressActions";

export interface Address {
  name?: string;
  latlng: LatLng;
}

export interface AddressState {
  searchAddress?: Address;
  clickAddress?: Address;
  distance: string;
  error: string;
  loading: boolean;
}

export const initialState = {
  distance: "",
  error: "",
  loading: false,
};

export const addressReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setDistance, (state: AddressState, { payload }) => {
      state.distance = payload;
    })
    .addCase(setError, (state: AddressState, { payload }) => {
      state.error = payload;
    })
    .addCase(setLoading, (state: AddressState, { payload }) => {
      state.loading = payload;
    })
    .addCase(setSearchAddress, (state: AddressState, { payload }) => {
      state.searchAddress = { ...state.searchAddress, ...payload };
    })
    .addCase(setClickAddress, (state: AddressState, { payload }) => {
      state.clickAddress = { ...state.clickAddress, ...payload };
    });
});
