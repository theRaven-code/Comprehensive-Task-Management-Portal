// src/components/Column.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppState } from '../context/AppStateContext';
import Task from './Task';
import { useDrop } from 'react-dnd';

interface ColumnProps {
  title: string;
  tasks: { id: number; title: string }[];
  id: number;
  onDrop: (taskId: number, columnId: number) => void;
}

const ColumnContainer = styled.div`
  background-color: #f4f4f4;
  padding: 16px;
  border-radius: 4px;
  width: 250px;
  margin: 8px;
`;

const ColumnTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
`;

const AddCardButton = styled.button`
  background-color: #3498db;
  color: #ffffff;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 16px;
  border-radius: 4px;
  width: 300px;
`;

const Column: React.FC<ColumnProps> = ({ title, tasks, id, onDrop }) => {
  const { state, dispatch } = useAppState();
  const [showModal, setShowModal] = useState(false);
  const [cardTitle, setCardTitle] = useState('');

  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item: any) => {
      dispatch({ type: 'MOVE_TASK', taskId: item.id, toColumnId: id });
      onDrop(item.id, id);
    },
  });

  const handleAddCardClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCardTitle(''); // Reset the cardTitle when closing the modal
  };

  const handleAddCardSubmit = () => {
    if (cardTitle.trim() !== '') {
      // Assuming you have a function in your app state context to add a card to the columns
      dispatch({ type: 'ADD_CARD', columnId: id, cardTitle });
      setShowModal(false);
      setCardTitle('');
    }
  };

  return (
    <ColumnContainer ref={drop}>
      <ColumnTitle>{title}</ColumnTitle>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
      <AddCardButton onClick={handleAddCardClick}>Add a Card</AddCardButton>

      <ModalOverlay show={showModal}>
        <ModalContent>
          <label htmlFor="cardTitle">Card Title:</label>
          <input
            type="text"
            id="cardTitle"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
          />
          <button onClick={handleModalClose}>Cancel</button>
          <button onClick={handleAddCardSubmit}>Add Card</button>
        </ModalContent>
      </ModalOverlay>
    </ColumnContainer>
  );
};

export default Column;
