// src/context/AppStateContext.tsx
import React, { createContext, useContext, useReducer, Dispatch } from 'react';

interface Task {
  id: number;
  title: string;
}

interface Column {
  id: number;
  title: string;
  tasks: Task[];
}

interface AppState {
  columns: Column[];
}

type Action =
  | { type: 'MOVE_TASK'; taskId: number; toColumnId: number }
  | { type: 'ADD_CARD'; columnId: number; cardTitle: string };

const AppStateContext = createContext<{ state: AppState; dispatch: Dispatch<Action> } | undefined>(undefined);

const initialState: AppState = {
  columns: [
    { id: 1, title: 'To Do', tasks: [{ id: 1, title: 'Task 1' }] },
    { id: 2, title: 'In Progress', tasks: [] },
    { id: 3, title: 'Done', tasks: [] },
    // Add more columns as needed
  ],
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'MOVE_TASK':
      return moveTask(state, action.taskId, action.toColumnId);

    case 'ADD_CARD':
      return addCard(state, action.columnId, action.cardTitle);

    default:
      return state;
  }
};

const moveTask = (state: AppState, taskId: number, toColumnId: number): AppState => {
  const updatedColumns = state.columns.map((column) => {
    return {
      ...column,
      tasks: column.tasks.filter((task) => task.id !== taskId),
    };
  });
  const toColumnIndex = updatedColumns.findIndex((column) => column.id === toColumnId);
  const taskToMove = state.columns
    .find((column) => column.tasks.some((task) => task.id === taskId))!
    .tasks.find((task) => task.id === taskId)!;

  updatedColumns[toColumnIndex].tasks.push(taskToMove);
  console.log({ state });
  return { ...state, columns: updatedColumns };
};

const addCard = (state: AppState, columnId: number, cardTitle: string): AppState => {
  const updatedColumns = state.columns.map((column) => {
    if (column.id === columnId) {
      return {
        ...column,
        tasks: [...column.tasks, { id: Date.now(), title: cardTitle }],
      };
    }
    return column;
  });

  return { ...state, columns: updatedColumns };
};

const AppStateProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>;
};

const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

export { AppStateProvider, useAppState };
