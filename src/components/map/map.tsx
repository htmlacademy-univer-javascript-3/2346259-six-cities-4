import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import {City, Points} from '../../types/offer';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../consts/url-marker.tsx';
import {useAppSelector} from '../../hooks';
import {getSelectedMarker} from '../../store/offers-process/selectors.ts';

type MapProps = {
  city: City;
  points: Points[];
  specialCaseId: string | undefined;
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

function Map({city, points, specialCaseId}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const selectedMarker: null | { id: string } = useAppSelector(
    getSelectedMarker
  );

  useEffect(() => {
    if (map && city) {
      map.flyTo([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [city, map]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {

        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        if (specialCaseId === undefined){
          marker
            .setIcon(selectedMarker !== null && point.id === selectedMarker.id ? currentCustomIcon : defaultCustomIcon)
            .addTo(markerLayer);
        } else {
          const isSpecialCase = specialCaseId && point.id === specialCaseId;
          marker
            .setIcon(isSpecialCase ? currentCustomIcon : defaultCustomIcon)
            .addTo(markerLayer);
        }
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedMarker, specialCaseId]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
