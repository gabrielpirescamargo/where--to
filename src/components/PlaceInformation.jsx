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
      console.log(task.id, id);
      if (task.id === id) {
        return {
          ...task,
          checked: checked ? true : false,
        };
      }
      return task;
    });

    setSelectedPlace((prev) => {
      return {
        ...prev,
        todo: newTodo,
      };
    });
  };
  const handleCreateTask = () => {
    setSelectedPlace((prev) => {
      return {
        ...prev,
        todo: [
          ...prev.todo,
          { id: uuidv4(), checked: false, description: newTodoName },
        ],
      };
    });
    setNewTodoName('');
  };

  const handleDeleteTask = (id) => {
    setSelectedPlace((prev) => {
      const newTodo = prev.todo.filter((task) => task.id !== id);
      return {
        ...prev,
        todo: newTodo,
      };
    });
  };

  return (
    <div
      style={{
        width: '100vh',
        height: '40vh',
        background: 'red',
        position: 'absolute',
        left: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      <span onClick={() => setIsOpenPanel(false)}>X</span>
      <h1>{selectedPlace?.name}</h1>

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
              <span onClick={() => handleDeleteTask(task?.id)}>Delete</span>
            </div>
          );
        })}
      </div>
      <div>
        <input
          onChange={(e) => {
            setNewTodoName(e.target.value);
          }}
          type='text'
          value={newTodoName}
          placeholder='New task'
        />
        <button
          onClick={() => {
            handleCreateTask();
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};
