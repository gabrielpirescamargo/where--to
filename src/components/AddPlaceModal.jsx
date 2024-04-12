import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
export const AddPlaceModal = ({ setIsOpenAddPlace, setPlacesWithGeo }) => {
  const [newPlaceName, setNewPlaceName] = useState('');
  const [newPlaceDisplayName, setNewPlaceDisplayName] = useState('');
  const handleCreatePlace = async () => {
    const newPlace = {
      id: uuidv4(),
      name: newPlaceName,
      displayName: newPlaceDisplayName,
      images: [],
      todo: [],
      address: null,
    };

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          newPlace.name
        )}&key=AIzaSyDCh_ofD6rCDP9S9K3LpQIjW2QHeoU8vmk`
      );
      console.log(response.data);

      const location = response?.data?.results?.[0]?.geometry?.location;
      const formatted_address = response?.data?.results?.[0]?.formatted_address;
      newPlace.address = location;
      newPlace.name = formatted_address;
    } catch (error) {
      console.error('Error fetching geocode:', error);
    }

    setPlacesWithGeo((prev) => {
      const oldValue = prev || [];
      return [...oldValue, newPlace];
    });
    setIsOpenAddPlace(false);
  };

  return (
    <div
      style={{
        position: 'absolute',

        background: 'rgba(0, 0, 0, 0.8)',
        width: '100vw',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        zIndex: 99999,
        height: '100vh',
      }}
    >
      <div
        style={{
          position: 'absolute',
          borderRadius: 24,
          background: '#383E45',
          width: '80vw',
          zIndex: 9999,
          border: '0px !important',
          display: 'flex',
          flexDirection: 'column',
          color: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 20,
          height: '20vh',
          left: '50%',
          top: '30%',
          gap: 8,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            right: 20,
            top: 20,
            fontSize: 12,
            width: 24,
            height: 24,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            background: 'red',
            borderRadius: 8,
          }}
          onClick={() => setIsOpenAddPlace(false)}
        >
          X
        </span>
        <h3 style={{ margin: 10 }}>Adicionar local</h3>
        <input
          style={{
            width: 200,
            border: 'none',
            borderRadius: 8,
          }}
          value={newPlaceDisplayName}
          placeholder='Nome'
          onChange={(e) => {
            setNewPlaceDisplayName(e.target.value);
          }}
          type='text'
        />
        <input
          style={{
            width: 200,
            border: 'none',
            borderRadius: 8,
          }}
          value={newPlaceName}
          onChange={(e) => {
            setNewPlaceName(e.target.value);
          }}
          placeholder='Endereço'
          type='text'
        />

        <button
          style={{
            width: 200,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            border: 'none',
            background: '#00DDA3',
            borderRadius: 8,
          }}
          onClick={handleCreatePlace}
        >
          Criar
        </button>
      </div>
    </div>
  );
};
