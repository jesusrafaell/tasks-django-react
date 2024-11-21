import api from "../config/api";
import { ITask, ITaskBase } from "../types/task";

const getAll = async (): Promise<ITask[]> => {
  return await api.get<ITask[]>("/api/tasks/");
};

const create = async (task: ITaskBase): Promise<ITask> => {
  return await api.post<ITask>("/api/tasks/", task);
};

const update = async (id: string, task: Partial<ITask>): Promise<ITask> => {
  return await api.put<ITask>(`/api/tasks/${id}/`, task);
};

const deleteTask = async (id: string): Promise<void> => {
  await api.delete<void>(`/api/tasks/${id}/`);
};

export default {
  getAll,
  create,
  update,
  delete: deleteTask,
};
