export interface ITaskBase {
  name: string;
  description: string;
}

export interface ITask extends ITaskBase {
  id: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}
