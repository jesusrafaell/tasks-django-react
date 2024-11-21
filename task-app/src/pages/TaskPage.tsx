import React from "react";
import TaskList from "../components/Task/TaskList";
import TaskForm from "../components/Task/TaskForm";

const TaskPage: React.FC = () => {
  const generateGrid = () => {
    const blocks = [];
    for (let k = 0; k < 1000; k++) {
      blocks.push(
        <div
          key={k}
          className="transition-colors duration-[1.5s] hover:duration-[0s]
          border-[#00FF00]
          h-[calc(5vw-2px)] w-[calc(5vw-2px)]
          md:h-[calc(4vw-2px)] md:w-[calc(4vw-2px)]
          lg:h-[calc(3vw-4px)] lg:w-[calc(3vw-4px)]
          bg-neutral-950 hover:bg-[#00FF00]"
        ></div>
      );
    }
    return blocks;
  };
  return (
    <div className="w-screen min-h-screen overflow-x-hidden flex justify-center">
      <div className="fixed">
        <div className="bg-black before:animate-pulse before:bg-gradient-to-b before:from-neutral-950 overflow-hidden before:via-[#00FF00] before:to-neutral-950 before:absolute">
          <div className="flex flex-wrap gap-0.5 h-screen items-center justify-center relative">
            {generateGrid()}
          </div>
        </div>
      </div>
      <div className="z-10 grid md:grid-cols-2 py-20 md:py-0 gap-10 md:gap-20">
        <div className="flex justify-center items-center">
          <TaskForm />
        </div>
        <TaskList />
      </div>
    </div>
  );
};

export default TaskPage;
