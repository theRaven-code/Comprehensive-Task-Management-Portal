// src/context/AppStateContext.tsx
import React, { createContext, useContext, useReducer, Dispatch } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface Column {
  id: number;
  label: string;
  fromDate?: Date;
  toDate?: Date;
  description?: string;
  imageUrl?: string;
  title: string;
  tasks: Task[];
}

interface AppState {
  columns: Column[];
  selectedTask: Task | null; // New field to hold the selected task
}

type Action =
  | { type: 'MOVE_TASK'; taskId: number; toColumnId: number }
  | { type: 'ADD_CARD'; columnId: number; cardTitle: string }
  | { type: 'EDIT_CARD'; columnId: number; taskId: number; newTitle: string }
  | {
      type: 'UPDATE_COLUMN';
      columnId: number;
      label?: string;
      fromDate?: Date;
      toDate?: Date;
      description?: string;
      imageUrl?: string;
      title?: string;
    }
  | { type: 'UPDATE_TASK'; taskId: number; newTitle: string }
  | { type: 'SELECT_TASK'; payload: Task } // New action to select a task
  | { type: 'CLEAR_SELECTED_TASK' }; // New action to clear selected task

const AppStateContext = createContext<{ state: AppState; dispatch: Dispatch<Action> } | undefined>(undefined);

const initialState: AppState = {
  columns: [
    {
      id: 1,
      label: 'Column 1',
      title: 'To Do',
      tasks: [
        { id: 1, text: 'Task 1', completed: false },
        // Add more tasks as needed
      ],
    },
    {
      id: 2,
      label: 'Column 2',
      title: 'In Progress',
      tasks: [],
    },
    {
      id: 3,
      label: 'Column 3',
      title: 'Done',
      tasks: [],
    },
    // Add more columns as needed
  ],
  selectedTask: null, // Initial selected task is null
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'MOVE_TASK':
      return moveTask(state, action.taskId, action.toColumnId);

    case 'ADD_CARD':
      return addCard(state, action.columnId, action.cardTitle);

    case 'EDIT_CARD':
      return editCard(state, action.columnId, action.taskId, action.newTitle);

    case 'UPDATE_COLUMN':
      return updateColumn(state, action.columnId, action);

    case 'UPDATE_TASK':
      return updateTask(state, action.taskId, action.newTitle);

    case 'SELECT_TASK':
      return { ...state, selectedTask: action.payload };

    case 'CLEAR_SELECTED_TASK':
      return { ...state, selectedTask: null };

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
  return { ...state, columns: updatedColumns };
};

const addCard = (state: AppState, columnId: number, cardTitle: string): AppState => {
  const updatedColumns = state.columns.map((column) => {
    if (column.id === columnId) {
      return {
        ...column,
        tasks: [...column.tasks, { id: Date.now(), text: cardTitle, completed: false }],
      };
    }
    return column;
  });

  return { ...state, columns: updatedColumns };
};

const editCard = (state: AppState, columnId: number, taskId: number, newTitle: string): AppState => {
  const updatedColumns = state.columns.map((column) => {
    if (column.id === columnId) {
      return {
        ...column,
        tasks: column.tasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              text: newTitle,
            };
          }
          return task;
        }),
      };
    }
    return column;
  });
  return { ...state, columns: updatedColumns };
};

const updateColumn = (
  state: AppState,
  columnId: number,
  updates: {
    label?: string;
    fromDate?: Date;
    toDate?: Date;
    description?: string;
    imageUrl?: string;
    title?: string;
  }
): AppState => {
  const updatedColumns = state.columns.map((column) => {
    if (column.id === columnId) {
      return {
        ...column,
        ...updates,
      };
    }
    return column;
  });

  return { ...state, columns: updatedColumns };
};

const updateTask = (state: AppState, taskId: number, newTitle: string): AppState => {
  const updatedColumns = state.columns.map((column) => {
    return {
      ...column,
      tasks: column.tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            text: newTitle,
          };
        }
        return task;
      }),
    };
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
