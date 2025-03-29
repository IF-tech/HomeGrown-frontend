export function createHtmlMap(
    container: HTMLDivElement,
    farms: any[],
    initialRegion: any,
    onMarkerClick: (farm: any) => void
  ) {
    const map = new google.maps.Map(container, {
      center: {
        lat: initialRegion.latitude,
        lng: initialRegion.longitude
      },
      zoom: 12,
      mapId: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
    });
  
    const markers = farms.map(farm => {
      const marker = new google.maps.Marker({
        position: { lat: farm.latitude, lng: farm.longitude },
        map,
        title: farm.farmName
      });
      
      marker.addListener('click', () => onMarkerClick(farm));
      return marker;
    });
  
    return () => {
      markers.forEach(marker => marker.setMap(null));
    };
  }