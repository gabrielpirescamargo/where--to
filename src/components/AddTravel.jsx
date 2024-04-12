import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import countryFlagEmoji from 'country-flag-emoji';

export const AddTravel = ({ setTravels, travels, setNewTravelModal }) => {
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [flag, setFlag] = useState('');
  const countryList = countryFlagEmoji.list;

  const inputStyle = {
    color: 'black',
    display: 'flex',
    flexDirection: 'row',
    border: 'none',
    height: '80px !important',
    fontSize: 14,
    width: '100%',
    justifyContent: 'space-between',
    padding: '10px 20px',
    alignItems: 'center',
    boxShadow: '5px 5px 10px 10px rgba(0, 0, 0, 0.1)', // Altere os valores para ajustar a sombra
    borderRadius: '5px', // Adicione bordas arredondadas para a sombra
    cursor: 'pointer', // Adicione um cursor indicando que é clicável
  };
  const inputStyleSelect = {
    color: 'black',
    display: 'flex',
    flexDirection: 'row',
    border: 'none',
    height: '80px !important',
    fontSize: 14,

    justifyContent: 'space-between',
    padding: '10px 20px',
    alignItems: 'center',
    boxShadow: '5px 5px 10px 10px rgba(0, 0, 0, 0.1)', // Altere os valores para ajustar a sombra
    borderRadius: '5px', // Adicione bordas arredondadas para a sombra
    cursor: 'pointer', // Adicione um cursor indicando que é clicável
  };
  const inputStyleDouble = {
    color: 'black',
    display: 'flex',
    flexDirection: 'row',
    border: 'none',
    height: '80px !important',
    fontSize: 14,
    width: '50%',
    justifyContent: 'space-between',
    padding: '10px 20px',
    alignItems: 'center',
    boxShadow: '5px 5px 10px 10px rgba(0, 0, 0, 0.1)', // Altere os valores para ajustar a sombra
    borderRadius: '5px', // Adicione bordas arredondadas para a sombra
    cursor: 'pointer', // Adicione um cursor indicando que é clicável
  };

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
        width: '90vw',
        height: '90vh',
        padding: 20,
        background: '#33404F',
        boorder: '10px solid black',
      }}
    >
      <button
        style={{
          position: 'absolute',
          right: 20,
          top: 20,
          fontSize: 12,
          width: 24,
          height: 24,
          border: '0px',
          color: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          background: 'red',
          borderRadius: 8,
        }}
        onClick={() => setNewTravelModal(false)}
      >
        X
      </button>
      <h1 style={{ color: 'white' }}>Criar viagem</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingRight: 10,

          gap: 16,
        }}
      >
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type='text'
          style={inputStyleSelect}
          placeholder='Nome da viagem'
        />
        <h3 style={{ color: 'white', margin: 0 }}>Escolha um pais:</h3>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <select
            style={inputStyleSelect}
            name='paises'
            id='paises'
            onChange={(e) => {
              const selected = countryList.find(
                (countr) => countr.name === e.target.value
              );
              setCountry(selected.name);
              setFlag(selected.emoji);
            }}
          >
            {countryList.map((element) => {
              return (
                <option key={element.name} value={element.name}>
                  {element.emoji} {element.name}
                </option>
              );
            })}
          </select>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              gap: 8,
            }}
          >
            <input
              style={inputStyleDouble}
              onChange={(e) => setCountry(e.target.value)}
              value={country || 'Nenhum pais selecionado'}
              type='text'
              disabled
              placeholder='Pais'
            />

            <input
              onChange={(e) => setFlag(e.target.value)}
              value={flag || 'Nenhuma bandeira selecionada'}
              type='text'
              disabled
              style={inputStyleDouble}
              placeholder='Flag'
            />
          </div>
        </div>
        <button
          style={{
            color: 'white',
            display: 'flex',
            flexDirection: 'row',
            border: 'none',
            height: 40,

            justifyContent: 'space-between',
            padding: '4px 8px',
            alignItems: 'center',
            background: '#039871',

            fontSize: 14,
            boxShadow: '5px 5px 10px 10px rgba(0, 0, 0, 0.1)', // Altere os valores para ajustar a sombra
            borderRadius: '5px', // Adicione bordas arredondadas para a sombra
            cursor: 'pointer', // Adicione um cursor indicando que é clicável
          }}
          onClick={handleCreateTravel}
        >
          Criar
        </button>
      </div>
    </div>
  );
};
