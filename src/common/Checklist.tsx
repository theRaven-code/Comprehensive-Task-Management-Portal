import React, { useState } from "react";

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

interface ChecklistProps {
  itemTitle: string;
  items: ChecklistItem[];
}

const Checklist: React.FC<ChecklistProps> = ({ itemTitle, items }) => {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(items);

  const handleToggle = (id: number) => {
    setChecklistItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h1>{itemTitle}</h1>
      {checklistItems.map((item) => (
        <div
          key={item.id}
          className={`flex items-center mb-2 ${
            item.completed ? "line-through text-gray-500" : "text-black"
          }`}
        >
          <input
            type="checkbox"
            id={`item-${item.id}`}
            checked={item.completed}
            onChange={() => handleToggle(item.id)}
            className="mr-2"
          />
          <label htmlFor={`item-${item.id}`} className="cursor-pointer">
            {item.text}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Checklist;
