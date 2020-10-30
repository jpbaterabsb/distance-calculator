import { createAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../index";
import {
  getDistanceFromLatLonInKm,
  getGeocode,
  getReverse,
  LatLng,
} from "../../services/geocode";
import { Address } from "../reducers/AddressReducer";

export const setLoading = createAction<boolean>("address/loading/set");
export const setError = createAction<string>("address/error/set");
export const setSearchAddress = createAction<Address>(
  "address/searcAddress/set"
);
export const setClickAddress = createAction<Address>(
  "address/clickAddress/set"
);
export const setDistance = createAction<string>("address/distance/set");
export const setIsNotAbleToCalculate = createAction<boolean>(
  "address/isNotAbleToCalculate/set"
);

export const calculateDistance = (position1: LatLng, position2: LatLng) => (
  dispatch: AppDispatch
) => {
  if (position1?.lat === 0 || position2?.lat === 0) {
    dispatch(
      setError("Please search a location and click in some place in map")
    );
    return;
  }
  dispatch(setLoading(true));
  const distanceInKm = getDistanceFromLatLonInKm(position1, position2);
  dispatch(setDistance(distanceInKm));
  dispatch(setLoading(false));
};

export const searchGeocodeByAddressName = (addressName: string) => async (
  dispatch: AppDispatch
) => {
  if (!addressName) {
    dispatch(setError("Please type some adress name"));
    return;
  }
  dispatch(setError(""));
  dispatch(setLoading(true));
  try {
    const { data } = await getGeocode(addressName);
    const { lat, lng } = data.results[0].geometry.location;
    dispatch(
      setSearchAddress({
        latlng: { lat, lng },
        name: data.results[0].formatted_address,
      })
    );
  } catch (ex) {
    dispatch(setError(ex.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const searchAddressNameByLatLng = (latlng: LatLng) => (
  dispatch: AppDispatch
) => {
  if (!latlng || latlng.lat === 0) {
    dispatch(setError("Please click in some place on googleMaps"));
    return;
  }
  setError("");
  setLoading(true);
  getReverse(latlng)
    .then((response) => response.data)
    .then((data) => {
      dispatch(
        setClickAddress({
          latlng: latlng,
          name: data.results[0].formatted_address,
        })
      );
    })
    .catch((ex: Error) => {
      if (ex.message.includes("formatted_address")) {
        dispatch(setError("Ops! Geolocation not found "));
      } else {
        dispatch(setError(ex.message));
      }
    })
    .finally(() => dispatch(setLoading(false)));
};
