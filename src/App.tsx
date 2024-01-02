// src/App.tsx
import React from 'react';
import styled from 'styled-components';
import Board from './components/Board';
import { useAppState } from './context/AppStateContext';

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  text-align: center;
  margin: 20px;
`;

const defaultColumns = [
  { id: 1, title: 'To Do', tasks: [{ id: 1, title: 'Task 1' }] },
  { id: 2, title: 'In Progress', tasks: [] },
  { id: 3, title: 'Done', tasks: [] },
];

const App: React.FC = () => {
  // Use useAppState to access state and dispatch if needed
  const { state, dispatch } = useAppState();

  // Define the columns prop with a fallback to the defaultColumns array
  const columnsData = state.columns || defaultColumns;

  return (
      <AppContainer className='bg-background '>
        <h1>Task Management</h1>
        <Board columns={columnsData} />
      </AppContainer>
  );
};

export default App;
