import React from "react";
import {
  Map,
  Marker,
  GoogleApiWrapper,
  Polyline,
  IGoogleApiOptions,
} from "google-maps-react";
import { Container } from "./styles";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { State } from "../../stores";
import { searchAddressNameByLatLng } from "../../stores/actions/AddressActions";
import { Address } from "../../stores/reducers/AddressReducer";

type MapContainerProps = {
  google: any;
};

interface StateToProps {
  distance: string;
  loading: boolean;
  error: string;
  searchAddress?: Address;
  clickAddress?: Address;
}

interface DispatchToProps {
  searchAddressNameByLatLng: Function;
}

const MapContainer: React.FC<
  MapContainerProps & StateToProps & DispatchToProps
> = ({ google, searchAddressNameByLatLng, searchAddress, clickAddress }) => {
  function handleClickPosition(_mapProps: any, _map: any, coord: any) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    searchAddressNameByLatLng({ lat, lng });
  }

  return (
    <Container>
      <Map
        key="map"
        google={google}
        zoom={14}
        initialCenter={{ lat: -15.646719999999998, lng: -47.762636799999996 }}
        onClick={handleClickPosition}
      >
        {searchAddress && clickAddress && (
          <Polyline
            path={[
              {
                lat: searchAddress.latlng.lat,
                lng: searchAddress.latlng.lng,
              },
              {
                lat: clickAddress.latlng.lat,
                lng: clickAddress.latlng.lng,
              },
            ]}
            options={{
              strokeColor: "red",
              strokeOpacity: 1,
              strokeWeight: 5,
              icons: [
                {
                  icon: "hello",
                  offset: "0",
                  repeat: "10px",
                },
              ],
            }}
          />
        )}

        {searchAddress && (
          <Marker
            position={{
              lat: searchAddress.latlng.lat,
              lng: searchAddress.latlng.lng,
            }}
            title={searchAddress.name}
          />
        )}
        {clickAddress && (
          <Marker
            position={{
              lat: clickAddress.latlng.lat,
              lng: clickAddress.latlng.lng,
            }}
            title={clickAddress.name}
          />
        )}
      </Map>
    </Container>
  );
};

const GoogleMapConfig = GoogleApiWrapper(
  (props): IGoogleApiOptions => ({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      ? process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      : "",
  })
)(MapContainer);

const stateToProps: MapStateToProps<StateToProps, {}, State> = ({
  address,
}) => ({
  distance: address.distance,
  loading: address.loading,
  error: address.error,
  clickAddress: address.clickAddress,
  searchAddress: address.searchAddress,
});

const dispatchToProps: MapDispatchToProps<DispatchToProps, {}> = {
  searchAddressNameByLatLng,
};

export const GoogleMap = connect(
  stateToProps,
  dispatchToProps
)(GoogleMapConfig);
