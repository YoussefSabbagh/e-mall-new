import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import styles from './googleMap.module.scss';

export const GoogleMaps = ({ location }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map location={location} />;
};

const Map = ({ location }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const center = useMemo(() => ({ lat: location[0], lng: location[1] }), []);

  return (
    <GoogleMap
      zoom={16}
      center={center}
      mapContainerClassName={styles.mapContainer}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};
