import { api } from "./api";

export interface LatLng {
  lat: number;
  lng: number;
}

const GEOCODE_PATH = "geocode/json";

export const getGeocode = (adress: string) => {
  const formatedAddress = adress.replaceAll(" ", "+");
  return api.get(GEOCODE_PATH, {
    params: {
      address: formatedAddress,
      key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    },
  });
};

export const getReverse = ({ lat, lng }: LatLng) => {
  return api.get(GEOCODE_PATH, {
    params: {
      latlng: `${lat},${lng}`,
      location_type: `RANGE_INTERPOLATED`,
      key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    },
  });
};

export const getDistanceFromLatLonInKm = (
  position1: LatLng,
  position2: LatLng
) => {
  const deg2rad = (deg: number) => deg * (Math.PI / 180);
  const R = 6371;
  const dLat = deg2rad(position2.lat - position1.lat);
  const dLng = deg2rad(position2.lng - position1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(position1.lat)) *
      Math.cos(deg2rad(position1.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2);
};
