import React, { useState, useEffect } from "react";
import {
  Map,
  Marker,
  GoogleApiWrapper,
  Polyline,
  IGoogleApiOptions,
} from "google-maps-react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { State } from "../../stores";
import { searchAddressNameByLatLng } from "../../stores/actions/AddressActions";
import { Address } from "../../stores/reducers/AddressReducer";
import { LatLng } from "../../services/geocode";

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
  const [center, setCenter] = useState<LatLng>({ lat: 0, lng: 0 });
  const [initialCenter, setInitialCenter] = useState<LatLng>({
    lat: 0,
    lng: 0,
  });
  function handleClickPosition(_mapProps: any, _map: any, coord: any) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    searchAddressNameByLatLng({ lat, lng });
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      setInitialCenter({
        lat,
        lng,
      });
    });
  }, []);

  useEffect(() => {
    if (searchAddress?.latlng) {
      setCenter(searchAddress.latlng);
    }
  }, [searchAddress]);

  return (
    <Map
      containerStyle={{
        position: "relative",
        width: 800,
        height: 560,
        // marginRight: 50,
      }}
      style={{
        borderRadius: 10,
        padding: 0,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
      }}
      key="map"
      google={google}
      zoom={14}
      center={center}
      initialCenter={initialCenter}
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
