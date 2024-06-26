import { useRef, useEffect, useState } from 'react';
import { Geocoder } from '@mapbox/search-js-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const accessToken = 'pk.eyJ1IjoibWVldGFuY2luZyIsImEiOiJjbHhzd3dldDIwczNnMmpzZW1iaTN2dWxjIn0.RXMnscY4UR13dJD2PCD5aw';

export const MapWithGeocoder=()=> {
   const mapContainerRef = useRef(null);
   const mapInstanceRef = useRef(null);
   const [, setMapLoaded] = useState(false);
   const [inputValue, setInputValue] = useState('');
   useEffect(() => {
      mapboxgl.accessToken = accessToken;

      mapInstanceRef.current = new mapboxgl.Map({
         container: mapContainerRef.current, // container ID
         center: [-74.5, 40], // starting position [lng, lat]
         zoom: 9, // starting zoom
      });

      mapInstanceRef.current.on('load', () => {
         setMapLoaded(true);
      });
   }, []);

   return (
      <>
         <Geocoder
            accessToken={accessToken}
            map={mapInstanceRef.current}
            mapboxgl={mapboxgl}
            value={inputValue}
            onChange={(d) => {
               setInputValue(d);
            }}
            marker
         />
         <div id="map-container" ref={mapContainerRef} style={{ height: 300 }} />
      </>
   );
}
