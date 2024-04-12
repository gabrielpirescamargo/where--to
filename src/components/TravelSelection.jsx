import { useState } from 'react';
import { AddTravel } from './AddTravel';

export const TravelSelection = ({
  travels,
  setTravels,
  setSelectedTravel,
  setIsMapView,
}) => {
  const [newTravelModal, setNewTravelModal] = useState(false);
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <header style={{ color: 'white', width: '100%', height: 80 }}>
        <h1 style={{ padding: 16, margin: 0 }}>Travels</h1>
      </header>
      <div
        style={{
          gap: 16,
          display: 'flex',
          flexDirection: 'column',
          padding: 20,
        }}
      >
        {travels?.map((travel) => {
          return (
            <div
              key={travel.id}
              style={{
                background: 'white',

                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '10px 20px',
                alignItems: 'center',
                boxShadow: '5px 5px 10px 10px rgba(0, 0, 0, 0.1)', // Altere os valores para ajustar a sombra
                borderRadius: '5px', // Adicione bordas arredondadas para a sombra
                cursor: 'pointer', // Adicione um cursor indicando que é clicável
              }}
              onClick={() => {
                setSelectedTravel(travel);
                setIsMapView(true);
              }}
            >
              <span style={{ fontSize: 24 }}> {travel?.name}</span>
              <span style={{ fontSize: 50 }}> {travel?.flag}</span>
            </div>
          );
        })}
      </div>

      <button
        style={{
          color: 'white',
          display: 'flex',
          flexDirection: 'row',
          border: 'none',
          height: 80,
          width: '90%',
          marginLeft: '5vw',
          justifyContent: 'space-between',
          padding: '10px 20px',
          alignItems: 'center',
          background: '#039871',

          fontSize: 24,
          boxShadow: '5px 5px 10px 10px rgba(0, 0, 0, 0.1)', // Altere os valores para ajustar a sombra
          borderRadius: '5px', // Adicione bordas arredondadas para a sombra
          cursor: 'pointer', // Adicione um cursor indicando que é clicável
        }}
        onClick={() => {
          setNewTravelModal(true);
        }}
      >
        Criar viagem
      </button>
      {newTravelModal && (
        <AddTravel
          setTravels={setTravels}
          travels={travels}
          setNewTravelModal={setNewTravelModal}
        />
      )}
    </div>
  );
};
