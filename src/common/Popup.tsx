// Popup.tsx
import React, { useState } from "react";
import Card from "./Card";
import { useAppState } from '../context/AppStateContext';

interface PopupProps {
  status: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ status, onClose }) => {
  const { state, dispatch } = useAppState();
  const selectedTask = state.selectedTask;
  const [editedTitle, setEditedTitle] = useState(selectedTask?.text || '');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleSave = () => {
    dispatch({ type: 'UPDATE_TASK', taskId: selectedTask!.id, newTitle: editedTitle });
    dispatch({ type: 'CLEAR_SELECTED_TASK' });
    onClose();
  };

  return (
    <>
      <div
        className={`absolute z-10 w-full h-full bg-blend-overlay text-white bg-slate-200 bg-opacity-55 flex items-center justify-center ${status ? 'block' : 'hidden'}`}
        onClick={onClose}
      >
        <Card handleSave={handleSave} handleClose={onClose} />
      </div>
    </>
  );
};

export default Popup;
