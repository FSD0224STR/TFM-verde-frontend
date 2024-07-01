import mapboxgl from 'mapbox-gl'; 
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import React, { useRef, useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useContext } from 'react';
import { LocationContext } from '../../context/locationContext';
import { main_theme } from '../../../palette-theme-colors';
import locationicon from '../../img/location-icon.png'
import { createRoot } from 'react-dom/client';
import { LocationComponentMap } from './LocationComponentMap';
import { useNavigate } from 'react-router-dom';

export const Map=()=>{

   mapboxgl.accessToken = 'pk.eyJ1IjoibWVldGFuY2luZyIsImEiOiJjbHhzd3dldDIwczNnMmpzZW1iaTN2dWxjIn0.RXMnscY4UR13dJD2PCD5aw';
   const { clusterData,click_Buttons_Events,city} = useContext(LocationContext)
   const mapContainer = useRef(null);
   const map = useRef(null);
   const navigate = useNavigate();
   const [lng, setLng] = useState(-3.4375  );
   const [lat, setLat] = useState( 39.7514);
   const [zoom, setZoom] = useState(5.1);
 
   /* const [lng, setLng] = useState(-3.6153);
   const [lat, setLat] = useState( 40.4156 );
   const [zoom, setZoom] = useState(10.44); */

   useEffect(() => {
    
      if (map.current) return; 
      map.current = new mapboxgl.Map({
        
         container: mapContainer.current,
         style: 	'mapbox://styles/mapbox/light-v11', //Opcion 2:'mapbox://styles/examples/clg45vm7400c501pfubolb0xz' opcion 1:'mapbox://styles/mapbox/light-v11'
         center: [lng, lat],
         zoom: zoom,
         attributionControl: false  

      })
      
      map.current.on('move', () => {
         setLng(map.current.getCenter().lng.toFixed(4));
         setLat(map.current.getCenter().lat.toFixed(4));
         setZoom(map.current.getZoom().toFixed(2));

      });
      map.current.on('load', () => {

         map.current.loadImage(
            locationicon,

            (error, image) => {
               if (error) throw error;

               //Añadir imagen al estilo del mapa
               map.current.addImage('location', image)
            });

         map.current.addSource('location-BDD', {
            type: 'geojson',
            data: {'type': 'FeatureCollection',
               'features':clusterData},
            cluster: true,
            clusterMaxZoom: 10,
            clusterRadius: 50
         })

         map.current.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'location-BDD',
            filter: ['has', 'point_count'],
            paint: {
               
               'circle-color': [
                  'step',
                  ['get', 'point_count'],
                  main_theme.palette.stack.primary, //Cuando haya menos de 35 puntos 
                  35,
                  main_theme.palette.stack.secondary,//Cuando haya entre 35-50 puntos 
                  50,
                  main_theme.palette.primary.main //Cuando haya mas de 50 puntos
               ],
               'circle-radius': [
             
                  'step',
                  ['get', 'point_count'],
                  25,   // Radio de 10 píxeles cuando la cuenta de puntos es menor que 35
                  35,
                  15,   // Radio de 15 píxeles cuando la cuenta de puntos está entre 35 y 50
                  50,
                  25    // Radio de 25 píxeles cuando la cuenta de puntos es 50 o mas
               ]
            }
         });

         map.current.addLayer({
            id: 'clusters-count',
            type: 'symbol',
            source: 'location-BDD',
            filter: ['has', 'point_count'],
            layout: {
               'text-field': ['get', 'point_count_abbreviated'],
               'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
               'text-size': 12
            },
            paint: {
               'text-color': '#000' 
            }
         });

         map.current.addLayer({
            id: 'unclustered-point',
            type: 'symbol',  // Cambiado a 'fill' para representar polígonos
            source: 'location-BDD',
            filter: ['!', ['has', 'point_count']],
            layout: {
               'icon-image': 'location',  // Nombre del ícono que se utilizará
               'icon-size': 0.05,        
               'icon-allow-overlap': true,  // Permite que los íconos se superpongan
               'icon-ignore-placement': true  // Ignora la colocación automática del ícono
            }
         });
      
      });

      //Evento que se produce al clicar alguno de los puntos marcados en el mapa
      map.current.on('click', (event) => {
         const features = map.current.queryRenderedFeatures(event.point, {
            layers: ['unclustered-point']
         });
         if (!features.length) { //Si no hay propiedades para mostrar en el punto seleccionado, no se ejecuta el popup. 
            
            return
         }
         const feature = features[0]; 

         //Este es el contenedor para el popup
         const div = document.createElement('div');
         const root = createRoot(div);

         root.render(<LocationComponentMap  feature={feature}/>) //En ese elemento del dom renderizo el componente que aparecerá en el popup
 
         const popup = new mapboxgl.Popup({ offset: [0, 10],closeOnClick: true }) //El offset es para no tapar el punto, se mostrará arriba a la derecha del pnto
            .setLngLat(feature.geometry.coordinates)
            .setDOMContent(div)
            .addTo(map.current);

         //Es como si popup fuera un elemento del html, ahora se pueden aplicar metodos de js 
         popup.getElement().addEventListener('click',()=>
         {
           
            const response=click_Buttons_Events(feature.properties._id)

            if (response){
               navigate(`/location/${feature.properties._id}/events`)
            } 
         }) 
            
      });

      map.current.addControl(new MapboxLanguage({
         defaultLanguage:'es',

      }))

      const geocoder=(
         new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            language: 'es-ES',
            placeholder: 'Buscar dirección',
         
         })
         
      )

      map.current.addControl(geocoder )
      
      function searchCity() {
         
         geocoder.query(city, function(err, results) {
          
            if (results && results.features && results.features.length > 0) {
               const firstResult = results.features[0];
               const coordinates = firstResult.geometry.coordinates;
               map.current.flyTo({
                  center: coordinates,
                  zoom: 12 
               });
            }
         });
        
      }
      
      searchCity()

   });
  
   return (
    
      <Paper  square={false}  sx={{ width: '97%', height:'90vh',m: '1rem',position:'relative'}} >

         <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
         </div>
         
         <div  ref={mapContainer} style={{ height: '100%', width: '100%',color:'black' }} />
      </Paper>
      
   );

}