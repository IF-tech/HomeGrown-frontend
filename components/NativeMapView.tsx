import React from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function NativeMapView({ farms, onMarkerPress, region }: any) {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      region={region}
      showsUserLocation
      showsMyLocationButton
    >
      {farms.map((farm: any) => (
        <Marker
          key={farm.id}
          coordinate={{
            latitude: farm.latitude,
            longitude: farm.longitude
          }}
          onPress={() => onMarkerPress(farm)}
        />
      ))}
    </MapView>
  );
}