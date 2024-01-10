// src/components/Board.tsx
import React from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from './Column';

const BoardContainer = styled.div`
  display: flex;
`;

interface BoardProps {
  columns: { id: number; title: string; tasks: { id: number; title: string }[] }[];
  openPopup: () => void;
}

const Board: React.FC<BoardProps> = ({ columns, openPopup }) => {
  const handleDrop = (taskId: number, columnId: number) => {
    console.log(`Task ${taskId} dropped into column ${columnId}`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <BoardContainer className='bg-slate-900'>
        {columns.map((column) => (
          <Column key={column.id} title={column.title} tasks={column.tasks} onDrop={handleDrop} id={column.id} openPopup={openPopup} />
        ))}
      </BoardContainer>
    </DndProvider>
  );
};

export default Board;
