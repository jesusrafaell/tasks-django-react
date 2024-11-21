import React from "react";
import { useTaskContext } from "../../context/TaskContext";
import { ITask } from "../../types/task";
import Card from "../UI/Card";
import ItemTask from "./ItemTask";

const TaskList: React.FC = () => {
  const { tasks, fetchTasks, updateTask, deleteTask, taskAdded } =
    useTaskContext();
  const listRef = React.useRef<HTMLUListElement>(null);
  const [length, setLength] = React.useState(0);

  React.useEffect(() => {
    fetchTasks();
  }, []);

  React.useEffect(() => {
    if (tasks.length > length) {
      setLength(tasks.length);
      scrollToTop();
    } else {
      setLength(tasks.length);
    }
  }, [tasks.length]);

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handlaUpdate = async (id: string, task: ITask) => {
    await updateTask(id, task);
  };

  return (
    <div className="p-4 w-[450px] z-20 flex flex-col justify-center items-center transition-all duration-300">
      <h1 className="text-2xl font-poppins mb-4 text-white">Task List</h1>
      <ul
        ref={listRef}
        className="flex flex-col space-y-4 h-[800px] overflow-y-scroll overflow-x-hidden"
      >
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`shadow rounded flex justify-between items-center transition-transform duration-300 
              ${taskAdded === task.id ? "animate-wiggle" : ""}`}
          >
            <Card>
              <ItemTask
                task={task}
                handleDelete={deleteTask}
                handleUpdate={handlaUpdate}
              />
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
