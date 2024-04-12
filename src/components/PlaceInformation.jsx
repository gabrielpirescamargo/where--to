import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const PlaceInformation = ({
  selectedPlace,
  setIsOpenPanel,
  setSelectedPlace,
}) => {
  const [newTodoName, setNewTodoName] = useState('');

  const handleCheck = (id, checked) => {
    const newTodo = selectedPlace.todo.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          checked: checked ? true : false,
        };
      }
      return task;
    });

    setSelectedPlace((prev) => {
      const oldValue = prev || [];
      return {
        ...oldValue,
        todo: newTodo,
      };
    });
  };
  const handleCreateTask = () => {
    setSelectedPlace((prev) => {
      const oldValue = prev.todo || [];
      return {
        ...prev,
        todo: [
          ...oldValue,
          { id: uuidv4(), checked: false, description: newTodoName },
        ],
      };
    });
    setNewTodoName('');
  };

  const handleDeleteTask = (id) => {
    setSelectedPlace((prev) => {
      const oldValue = prev || [];
      const newTodo = prev.todo.filter((task) => task.id !== id);
      return {
        ...oldValue,
        todo: newTodo,
      };
    });
  };
  console.log(selectedPlace);
  return (
    <div
      style={{
        width: '100vw',
        overflow: 'hidden',
        height: '43vh',
        background: '#33404F',
        position: 'absolute',
        color: 'white',
        left: 0,
        bottom: 0,
        whiteSpace: 'nowrap',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        textOverflow: 'ellipsis',
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
        onClick={() => setIsOpenPanel(false)}
      >
        X
      </span>
      <div
        style={{
          width: '100%',
          paddingLeft: 30,
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
        }}
      >
        <h1>{selectedPlace?.displayName}</h1>
        <span>{selectedPlace?.name}</span>

        <div>
          {selectedPlace?.todo?.map((task) => {
            return (
              <div
                key={task.id}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '90vw',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <input
                    type='checkbox'
                    title={task?.description}
                    id={task?.id}
                    checked={task?.checked}
                    onChange={(e) => {
                      handleCheck(task?.id, e.target.checked);
                    }}
                  />
                  <label htmlFor={task?.id}>{task?.description}</label>
                </div>
                <span onClick={() => handleDeleteTask(task?.id)}>Remover</span>
              </div>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 20,
          }}
        >
          <input
            onChange={(e) => {
              setNewTodoName(e.target.value);
            }}
            type='text'
            value={newTodoName}
            placeholder='Novo to-do'
          />
          <button
            onClick={() => {
              handleCreateTask();
            }}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};
