// src/components/Column.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppState } from '../context/AppStateContext';
import Task from './Task';
import { useDrop } from 'react-dnd';

interface ColumnProps {
  title: string;
  tasks: { id: number; title: string, completed: boolean }[];
  id: number;
  onDrop: (taskId: number, columnId: number) => void;
  openPopup: () => void; // New prop for opening the popup
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
  background-color: #f4f4f4;
  color: #666666;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: font-weight 0.3s ease;

  &:hover {
    font-weight: bold;
  }
`;

const Column: React.FC<ColumnProps> = ({ title, tasks, id, onDrop, openPopup }) => {
  const { state, dispatch } = useAppState();
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardTitle, setCardTitle] = useState('');

  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item: any) => {
      dispatch({ type: 'MOVE_TASK', taskId: item.id, toColumnId: id });
      onDrop(item.id, id);
    },
  });

  const handleAddCardClick = () => {
    setIsAddingCard(true);
  };

  const handleAddCardSubmit = () => {
    if (cardTitle.trim() !== '') {
      dispatch({ type: 'ADD_CARD', columnId: id, cardTitle });
      setIsAddingCard(false);
      setCardTitle('');
    }
  };

  return (
    <ColumnContainer ref={drop}>
      <ColumnTitle>{title}</ColumnTitle>
      {tasks.map((task) => (
        <Task key={task.id} task={task} columnId={id} openPopup={openPopup} isEditing={false} onCancel={function (): void {
          throw new Error('Function not implemented.');
        } } onSave={function (): void {
          throw new Error('Function not implemented.');
        } } />
      ))}
      {isAddingCard && (
        <Task
          task={{ id: 0, title: cardTitle, completed: false }}
          columnId={id}
          isEditing={true}
          onCancel={() => setIsAddingCard(false)}
          onSave={handleAddCardSubmit}
          openPopup={openPopup}
        />
      )}
      <AddCardButton onClick={handleAddCardClick} disabled={isAddingCard} color={isAddingCard ? 'red' : 'inherit'}>
        Add a Card
      </AddCardButton>
    </ColumnContainer>
  );
};

export default Column;
