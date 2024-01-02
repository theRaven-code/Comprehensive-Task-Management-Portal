// src/components/Board.tsx
import React from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from './Column';

interface BoardProps {
  columns: { id: number; title: string; tasks: { id: number; title: string }[] }[];
}

const BoardContainer = styled.div`
  display: flex;
`;

const Board: React.FC<BoardProps> = ({ columns }) => {
  const handleDrop = (taskId: number, columnId: number) => {
    // Implement the logic to update the tasks based on the dropped task and column
    console.log(`Task ${taskId} dropped into column ${columnId}`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <BoardContainer>
        {columns.map((column) => (
          <Column key={column.id} title={column.title} tasks={column.tasks} onDrop={handleDrop} id={column.id} />
        ))}
      </BoardContainer>
    </DndProvider>
  );
};

export default Board;
