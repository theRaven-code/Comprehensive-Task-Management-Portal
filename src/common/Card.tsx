// import React, { useState } from "react";
// import Checklist from "./Checklist";
// import { Edit } from "lucide-react";

// interface CardProps {
//   title: string;
//   imageUrl: string;
//   content: string;
// }

// const Card: React.FC<CardProps> = ({ title, imageUrl, content }) => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [imgUrl, setImgUrl] = useState(imageUrl);
//   const initialChecklistItems = [
//     { id: 1, text: "Item 1", completed: false },
//     { id: 2, text: "Item 2", completed: true },
//     { id: 3, text: "Item 3", completed: false },
//   ];

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         if (event.target) {
//           setImgUrl(event.target.result as string);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <>
//       <div className="min-w-[300px] md:w-[600px] min-h-[300px] h-400px overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 outline hover:outline-white">
//         <div className="relative ">
//           <img
//             className="rounded-t-lg w-full h-[200px] object-cover bg-blend-exclusion "
//             src={imgUrl}
//             alt=""
//           />
//           <h1 className="text-3xl absolute p-4 text-white left-0 bottom-0">
//             {title}
//           </h1>
//           <button className="absolute top-0 right-0 text-white p-4 flex flex-row gap-2">
//             <input
//               type="file"
//               name=""
//               id="imageInput"
//               onChange={handleImageChange}
//             />
//             <Edit />
//           </button>
//         </div>
//         <div className="p-5 w-full h-max overflow-auto flex flex-col gap-3">
//           <div className="flex flex-row">
//             <label htmlFor="dateRange">Date Range: </label>
//             <input
//               id="dateRange"
//               type="date"
//               className=" border-y-2 border-l-2 pr-2 pl-2 mr-2 ml-2"
//             />{" "}
//             to
//             <input
//               id="dateRange"
//               type="date"
//               className=" border-y-2 border-r-2 pr-2 pl-2 ml-2 hover:outline hover:outline-white"
//             />
//           </div>
//           <div>
//             <label htmlFor="dateRange">Description: </label>
//             <textarea rows={2} className="w-full border-2 p-2" />
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
//             <div className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500 w-12"></div>
//           </div>
//           <Checklist items={initialChecklistItems} itemTitle={"Checked List"} />
//         </div>
//       </div>
//       <div className="m-4 flex flex-col gap-3 outline p-4 hover:outline-white">
//         <caption className="text-white">Operations</caption>
//         <button className="pr-4 pl-4 pt-2 pb-2 bg-blue text-white hover:font-bold hover:outline-white hover:outline">
//           Save
//         </button>
//         <button className="pr-4 pl-4 pt-2 pb-2 bg-red text-white hover:outline-white hover:outline">
//           Delete
//         </button>
//       </div>
//     </>
//   );
// };

// export default Card;

import React, { useState } from "react";
import Checklist from "./Checklist";
import { Edit } from "lucide-react";
import { useAppState } from '../context/AppStateContext';

interface CardProps {
  handleSave: () => void;
  handleClose: () => void;
}

const Card: React.FC<CardProps> = ({ handleSave, handleClose }) => {
  const { state } = useAppState();
  const selectedTask = state.selectedTask;
  const [startDate, setStartDate] = useState(new Date());
  const [imgUrl, setImgUrl] = useState(selectedTask?.imageUrl || '');

  const initialChecklistItems = [
    { id: 1, text: "Item 1", completed: false },
    { id: 2, text: "Item 2", completed: true },
    { id: 3, text: "Item 3", completed: false },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setImgUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="min-w-[300px] md:w-[600px] min-h-[300px] h-400px overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 outline hover:outline-white">
        <div className="relative ">
          <img
            className="rounded-t-lg w-full h-[200px] object-cover bg-blend-exclusion "
            src={imgUrl}
            alt=""
          />
          <h1 className="text-3xl absolute p-4 text-white left-0 bottom-0">
            {selectedTask?.title || ''}
          </h1>
          <button className="absolute top-0 right-0 text-white p-4 flex flex-row gap-2">
            <input
              type="file"
              name=""
              id="imageInput"
              onChange={handleImageChange}
            />
            <Edit />
          </button>
        </div>
        <div className="p-5 w-full h-max overflow-auto flex flex-col gap-3">
          <Checklist items={initialChecklistItems} itemTitle={"Checked List"} />
        </div>
      </div>
      <div className="m-4 flex flex-col gap-3 outline p-4 hover:outline-white">
        <caption className="text-white">Operations</caption>
        <button onClick={handleSave} className="pr-4 pl-4 pt-2 pb-2 bg-blue text-white hover:font-bold hover:outline-white hover:outline">
          Save
        </button>
        <button onClick={handleClose} className="pr-4 pl-4 pt-2 pb-2 bg-red text-white hover:outline-white hover:outline">
          Delete
        </button>
      </div>
    </>
  );
};

export default Card;
