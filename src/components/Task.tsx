// src/components/Task.tsx
import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';

interface TaskProps {
  task: {
    id: number;
    title: string;
  };
}

const TaskContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  cursor: pointer;
`;

const Task: React.FC<TaskProps> = ({ task }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id: task.id },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      });
  return (
    <TaskContainer ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {task.title}
    </TaskContainer>
  );
};

export default Task;
