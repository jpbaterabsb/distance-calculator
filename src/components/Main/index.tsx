import React, { useState } from "react";
import { Input } from "../Input";
import { Button, theme } from "../Button";
import {
  calculateDistance,
  setError,
  setLoading,
  searchGeocodeByAddressName,
} from "../../stores/actions/AddressActions";
import { Container, ThreeDotsLoader } from "./styles";
import { GoogleMap } from "../MapContainer";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { State } from "../../stores";
import { toast } from "react-toastify";
import { Address } from "../../stores/reducers/AddressReducer";

interface StateToProps {
  distance: string;
  loading: boolean;
  error: string;
  searchAddress?: Address;
  clickAddress?: Address;
}

interface DispatchToProps {
  calculateDistance: Function;
  setError: Function;
  setLoading: Function;
  searchGeocodeByAddressName: Function;
}
const nullLatLng = { lat: 0, lng: 0 };

export const MainComponent: React.FC<StateToProps & DispatchToProps> = ({
  distance,
  loading,
  error,
  searchAddress = { latlng: nullLatLng },
  clickAddress = { latlng: nullLatLng },
  searchGeocodeByAddressName,
  calculateDistance,
  setError,
}) => {
  const [name, setName] = useState<string>("");

  function handleClickSearch() {
    searchGeocodeByAddressName(name);
  }

  function calculate() {
    calculateDistance(searchAddress.latlng, clickAddress?.latlng);
  }

  if (loading) {
    return (
      <Container>
        <ThreeDotsLoader />
      </Container>
    );
  }

  if (error) {
    toast.error(error);
    setError("");
  }

  return (
    <Container>
      <div className="row">
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="buttons">
          <Button
            theme={theme.primary}
            value="SEARCH"
            onClick={() => handleClickSearch()}
          />
          <Button
            theme={theme.green}
            style={{
              marginLeft: 16,
            }}
            onClick={() => calculate()}
            value="CALCULATE"
          />
        </div>
      </div>
      {distance && (
        <>
          <div className="row">
            <span title="main-text" className="main-text">{`From: ${
              searchAddress.name ? searchAddress.name : "---"
            }`}</span>
          </div>
          <div className="row">
            <span className="main-text">{`To:${
              clickAddress.name ? clickAddress.name : "---"
            } `}</span>
          </div>
          <div className="row">
            <span className="main-text">{`Average Distance
        KM: ${distance}`}</span>
          </div>
        </>
      )}
      <GoogleMap />
    </Container>
  );
};

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
  calculateDistance,
  setError,
  setLoading,
  searchGeocodeByAddressName,
};

export const Main = connect(stateToProps, dispatchToProps)(MainComponent);
