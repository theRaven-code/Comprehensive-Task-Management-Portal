import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import { Edit, LucidePackageOpen } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import Popup from '../common/Popup';

interface TaskProps {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
  columnId: number;
  isEditing: boolean;
  onCancel: () => void;
  onSave: (editedTitle: string) => void;
  openPopup: () => void; // New prop for opening the popup
}

const TaskContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  cursor: pointer;
  min-height: 40px; /* Set a fixed height */
  position: relative;

  &:hover .edit-button {
    opacity: 1;
  }
`;

const TaskTitle = styled.span`
  text-align: left;
  flex-grow: 1;
  border: none;
  padding: 0;
  margin: 0;
  font-size: inherit;
`;

const EditableTitle = styled.input`
  flex-grow: 1;
  border: none;
  padding: 0;
  margin: 0;
  font-size: inherit;
  outline: none; /* Remove the default input outline */
`;

const EditButton = styled.button`
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const Task: React.FC<TaskProps> = ({ task, columnId, isEditing, onCancel, onSave, openPopup }) => {
  const { state, dispatch } = useAppState();
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    isEditing && handleTitleClick();
  }, []);

  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);

  const handleTitleClick = () => {
    setEditMode(true)
  };
  
  const handlePopup = () => {
    setPopupVisible(true);
    openPopup;
    dispatch({ type:'SELECT_TASK', payload: task })
  }

  {console.log(task)}
  const handleEditComplete = () => {
    isEditing
    ? dispatch({ type: 'EDIT_CARD', columnId: columnId, taskId: task.id, newTitle: editedTitle })    
    : dispatch({ type: 'ADD_CARD', columnId: columnId, cardTitle: editedTitle });
    setEditMode(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEditComplete();
    }
  };

  return (
    <>
      <TaskContainer ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
        {editMode ? (
          <EditableTitle
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleEditComplete}
            onKeyDown={handleKeyPress}
            className=' z-0'
            autoFocus
          />
        ) : (
          <div >
            <TaskTitle >{task.title}</TaskTitle>
            <EditButton  onClick={handleTitleClick} onDoubleClick={()=>setPopupVisible(true)} className="edit-button px-2 rounded-full hover:bg-slate-300">
              <Edit />
            </EditButton>
            <EditButton  onClick={handlePopup} className="edit-button px-2 rounded-full hover:bg-slate-300">
              <LucidePackageOpen />
            </EditButton>
          </div>
        )}
      </TaskContainer>
    </>
  );
};

export default Task;
