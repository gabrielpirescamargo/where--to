import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PlaceInformation } from './PlaceInformation';
import { AddPlace } from './AddPlace';
import { AddPlaceModal } from './AddPlaceModal';

export const MapView = ({
  placesWithGeo,
  setPlacesWithGeo,
  setIsMapView,
  setSelectedTravel,
}) => {
  const [selectedPlace, setSelectedPlace] = useState({});
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [isOpenAddPlace, setIsOpenAddPlace] = useState(false);

  const handleOpenPlaceInformation = (place) => {
    setIsOpenPanel(true);
    setSelectedPlace(place);
  };

  useEffect(() => {
    const newPlaces = placesWithGeo.map((place) => {
      if (place.id === selectedPlace.id) {
        return selectedPlace;
      }
      return place;
    });
    setPlacesWithGeo(newPlaces);
  }, [selectedPlace]);

  return (
    <div style={{ overflow: 'hidden' }}>
      <span
        style={{
          background: '#33404F',
          padding: '16px',
          color: 'white',
          position: 'absolute',
          fontSize: 24,
          left: 0,
          top: 0,
          fontWeight: 'bold',
          width: '100vw',
          zIndex: 999,
        }}
        onClick={() => {
          setIsMapView(false);
          setSelectedTravel(null);
        }}
      >
        ⬅ Voltar
      </span>
      <APIProvider apiKey='AIzaSyDCh_ofD6rCDP9S9K3LpQIjW2QHeoU8vmk'>
        <Map
          defaultCenter={{ lat: 45, lng: -75 }}
          defaultZoom={5}
          style={{
            width: '100vw',
            height: isOpenPanel ? '60vh' : '98vh',
            overflow: 'hidden',
          }}
          mapId='AIzaSyDCh_ofD6rCDP9S9K3LpQIjW2QHeoU8vmk'
        >
          {placesWithGeo?.length > 0 &&
            placesWithGeo?.map((place) => (
              <AdvancedMarker
                onClick={() => handleOpenPlaceInformation(place)}
                key={place.id}
                position={{
                  lat: place?.address?.lat || 22,
                  lng: place?.address?.lng || 22,
                }}
              />
            ))}
        </Map>
        {isOpenPanel && (
          <PlaceInformation
            selectedPlace={selectedPlace}
            setIsOpenPanel={setIsOpenPanel}
            setSelectedPlace={setSelectedPlace}
          />
        )}
      </APIProvider>
      <AddPlace setIsOpenAddPlace={setIsOpenAddPlace} />
      {isOpenAddPlace && (
        <AddPlaceModal
          setIsOpenAddPlace={setIsOpenAddPlace}
          setPlacesWithGeo={setPlacesWithGeo}
        />
      )}
    </div>
  );
};
