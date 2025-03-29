import React from 'react';
import { Platform } from 'react-native';
import NativeMapView from './NativeMapView';
import WebMapView from './WebMapView';

const MapView = (props: any) => {
  if (Platform.OS === 'web') {
    return <WebMapView {...props} />;
  }
  return <NativeMapView {...props} />;
};

export default MapView;