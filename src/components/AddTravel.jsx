import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const AddTravel = ({ setTravels, travels, setNewTravelModal }) => {
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [flag, setFlag] = useState('');
  const handleCreateTravel = () => {
    const newTravel = {
      country,
      flag,
      name,
      id: uuidv4(),
      places: [],
    };
    const oldValue = travels || [];
    setTravels([...oldValue, newTravel]);
    setNewTravelModal(false);
  };
  return (
    <div
      style={{
        zIndex: 999,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        padding: 20,
        background: 'blue',
        boorder: '10px solid black',
      }}
    >
      <button onClick={() => setNewTravelModal(false)}>X</button>
      <input
        onChange={(e) => setCountry(e.target.value)}
        value={country}
        type='text'
        placeholder='Pais'
      />
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type='text'
        placeholder='Nome'
      />
      <input
        onChange={(e) => setFlag(e.target.value)}
        value={flag}
        type='text'
        placeholder='Flag'
      />
      <button onClick={handleCreateTravel}>Criar</button>
    </div>
  );
};
