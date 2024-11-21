import React from "react";
import taskService from "../services/taskService";
import { ITask, ITaskBase } from "../types/task";

interface TaskContextProps {
  tasks: ITask[];
  fetchTasks: () => Promise<void>;
  createTask: (task: ITaskBase) => Promise<void>;
  updateTask: (id: string, task: ITask) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  taskAdded: string | null;
}

const TaskContext = React.createContext<TaskContextProps>({
  tasks: [],
  fetchTasks: async () => {},
  createTask: async () => {},
  updateTask: async () => {},
  deleteTask: async () => {},
  taskAdded: "",
});

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = React.useState<ITask[]>([]);
  const [taskAdded, setTaskAdded] = React.useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await taskService.getAll();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const createTask = async (task: ITaskBase) => {
    try {
      const newTask = await taskService.create(task);
      setTasks((prevTasks) => [newTask, ...prevTasks]);
      setTaskAdded(newTask.id);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateTask = async (id: string, task: Partial<ITask>) => {
    try {
      const updatedTask = await taskService.update(id, task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === id ? updatedTask : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.delete(id);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        taskAdded,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextProps => {
  const context = React.useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
