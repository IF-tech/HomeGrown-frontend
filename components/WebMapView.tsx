import React, { useEffect, useRef } from 'react';
import { createHtmlMap } from '../utils/webMapUtils';

export default function WebMapView({ farms, onMarkerPress, region }: any) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const cleanup = createHtmlMap(mapRef.current, farms, region, onMarkerPress);
      return cleanup;
    }
  }, [farms, region]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
}