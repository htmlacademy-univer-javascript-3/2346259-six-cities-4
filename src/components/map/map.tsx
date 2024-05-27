
import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../consts/url-marker.tsx';
import {useAppSelector} from '../../hooks';

import 'leaflet/dist/leaflet.css';
import {City, Offer} from '../../types/offer';

type MapProps = {
  city: City;
  points: Offer[];
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({city, points}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const selectedMarker: null | { id: string } = useAppSelector(
    (state) => state.selectedMarker
  );

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(selectedMarker !== null && point.id === selectedMarker.id ? currentCustomIcon : defaultCustomIcon)
          .addTo(markerLayer);
      });

      return () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedMarker]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
