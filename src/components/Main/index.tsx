import React, { useState, useEffect } from "react";
import {
  calculateDistance,
  setError,
  setLoading,
  searchGeocodeByAddressName,
} from "../../stores/actions/AddressActions";
import { BigContainer, Card, ThreeDotsLoader } from "./styles";
import { GoogleMap } from "../MapContainer";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { State } from "../../stores";
import { toast } from "react-toastify";
import { Address } from "../../stores/reducers/AddressReducer";
import { Input } from "../Input";
import { theme, Button } from "../Button";

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

  useEffect(() => {
    if (searchAddress.latlng.lat !== 0 && clickAddress.latlng.lat !== 0) {
      calculateDistance(searchAddress.latlng, clickAddress?.latlng);
    }
  }, [searchAddress, clickAddress, calculateDistance]);

  if (loading) {
    return (
      <BigContainer>
        <ThreeDotsLoader />
      </BigContainer>
    );
  }

  if (error) {
    toast.error(error);
    setError("");
  }

  return (
    <BigContainer>
      <Card>
        <div className="card-item">
          <span className="title">Distance Calculator</span>
        </div>
        <div className="card-item">
          <Input
            label="Name"
            value={name}
            width="311"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="card-item">
          <Button
            theme={theme.primary}
            value="SEARCH"
            onClick={() => handleClickSearch()}
          />
        </div>
        <div className="card-item">
          <span className="main-text">
            <span className="property">From:</span>
            {` ${searchAddress.name ? searchAddress.name : "---"} `}
          </span>
        </div>
        <div className="card-item">
          <span className="main-text">
            <span className="property">To:</span>
            {` ${clickAddress.name ? clickAddress.name : "---"} `}
          </span>
        </div>
        <div className="card-item">
          <span className="main-text">
            <span className="property">Average Distance:</span>
            {` ${distance} Km`}
          </span>
        </div>
      </Card>
      <GoogleMap />
    </BigContainer>
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
