import { useEffect, useState } from 'react';
import { MapView } from './components/MapView';
import axios from 'axios';
import { TravelSelection } from './components/TravelSelection';
const App = () => {
  const data = JSON.parse(localStorage.getItem('data'));

  const [isMapView, setIsMapView] = useState(false);

  const [travels, setTravels] = useState(data?.travels);
  const [selectedTravel, setSelectedTravel] = useState(data?.travels?.[0]);
  const [placesWithGeo, setPlacesWithGeo] = useState(
    data?.travels?.[0]?.places
  );
  useEffect(() => {
    const getGeo = async () => {
      if (!selectedTravel?.places || selectedTravel?.places?.length === 0)
        return;

      const updatedPlaces = await Promise.all(
        selectedTravel?.places?.map(async (place) => {
          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                place.name
              )}&key=AIzaSyDCh_ofD6rCDP9S9K3LpQIjW2QHeoU8vmk`
            );

            const location = response?.data?.results?.[0]?.geometry?.location;
            return { ...place, address: location };
          } catch (error) {
            console.error('Error fetching geocode:', error);
            return place;
          }
        })
      );

      setPlacesWithGeo(updatedPlaces);
    };

    getGeo();
  }, [selectedTravel]);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify({ travels }));
  }, [travels]);
  console.log(placesWithGeo);
  useEffect(() => {
    const newTravels = travels?.map((travel) => {
      if (travel?.id === selectedTravel?.id) {
        return {
          ...selectedTravel,
          places: placesWithGeo,
        };
      }
      return travel;
    });
    setTravels(newTravels);
  }, [placesWithGeo]);

  return (
    <div>
      {isMapView ? (
        <MapView
          placesWithGeo={placesWithGeo}
          setPlacesWithGeo={setPlacesWithGeo}
          setIsMapView={setIsMapView}
          setSelectedTravel={setSelectedTravel}
        />
      ) : (
        <TravelSelection
          travels={travels}
          setTravels={setTravels}
          setSelectedTravel={setSelectedTravel}
          setIsMapView={setIsMapView}
        />
      )}
    </div>
  );
};
export default App;
