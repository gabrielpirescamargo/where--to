import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const AddPlaceModal = ({ setIsOpenAddPlace, setPlacesWithGeo }) => {
  const [newPlaceName, setNewPlaceName] = useState('');
  const handleCreatePlace = () => {
    const newPlace = {
      id: uuidv4(),
      name: newPlaceName,
      images: [],
      todo: [],
    };
    setPlacesWithGeo((prev) => {
      const oldValue = prev || [];
      return [...oldValue, newPlace];
    });
  };
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'blue',
        width: '100vw',
        zIndex: 9999,
        border: '0px !important',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        height: '100vh',
      }}
    >
      Adicionar place
      <input
        value={newPlaceName}
        onChange={(e) => {
          setNewPlaceName(e.target.value);
        }}
        type='text'
      />
      <button onClick={handleCreatePlace}>Criar</button>
      <span onClick={() => setIsOpenAddPlace(false)}>X</span>
    </div>
  );
};
