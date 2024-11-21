import React from "react";
import { ITask } from "../../types/task";
import { formatDateTime } from "../../utils/convertDate";

interface Props {
  task: ITask;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, task: ITask) => Promise<void>;
}

const ItemTask: React.FC<Props> = ({ task, handleDelete, handleUpdate }) => {
  const [isRemoving, setIsRemoving] = React.useState(false);

  const handleComplete = async (completed: boolean) => {
    await handleUpdate(task.id, { ...task, isCompleted: completed });
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      handleDelete(task.id);
    }, 200);
  };

  return (
    <div
      className={`p-8 border-blue-gray-50 blue-gray-500 w-[400px] bg-black bg-opacity-30  transition-all duration-500  
      ${isRemoving ? "opacity-0 scale-0" : "opacity-100"}
    `}
    >
      <div className="mb-2 flex justify-between items-center">
        <h2 className="block font-sans text-2xl font-medium  leading-relaxed tracking-normal text-blue-gray-900 antialiased transition-colors hover:text-pink-500">
          {task.name}
        </h2>
        <button
          className="p-2 rounded-full transition duration-200 hover:bg-slate-800"
          onClick={handleRemove}
        >
          <svg
            className=" w-5 h-5 text-gray-200 fill-current"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <p className="font-sans text-md font-normal leading-normal text-gray-400 antialiased break-words">
        {task.description || "This task has no description."}
      </p>

      <div className="flex flex-col items-end justify-end">
        <p className="block font-sans text-md font-normal leading-normal text-gray-500 antialiased ">
          Created: {formatDateTime(task.createdAt)}
        </p>

        <p className="block font-sans text-md font-normal leading-normal text-gray-500 antialiased h-2">
          {task.isCompleted && (
            <span>Completed: {formatDateTime(task.updatedAt)}</span>
          )}
        </p>
      </div>

      {/* toggle */}
      <div className="mt-4 flex items-center gap-5 text-[12px]">
        <div className="relative w-full mt-4 rounded-md border h-10 p-1 bg-gray-200">
          <div className="relative w-full h-full flex items-center">
            <div
              onClick={() => handleComplete(true)}
              className="w-full text-nowrap flex justify-center text-gray-400 cursor-pointer"
            >
              <button>All set!</button>
            </div>
            <div
              onClick={() => handleComplete(false)}
              className="w-full text-nowrap flex justify-center text-gray-400 cursor-pointer"
            >
              <button>Task not done?</button>
            </div>
          </div>

          <span
            className={`bg-white shadow text-[0.75rem] flex items-center justify-center w-1/2 rounded h-[1.88rem] transition-all duration-150 ease-linear top-[4px] absolute text-nowrap ${
              task.isCompleted
                ? "left-1 text-indigo-600 font-semibold cursor-not-allowed"
                : "left-1/2 -ml-1 text-red-600"
            }`}
          >
            {task.isCompleted ? "Completed" : "Not Completed"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemTask;
