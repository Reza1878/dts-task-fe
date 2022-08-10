export interface TaskType {
  id: number;
  task: string;
  assignee: string;
  due_date: string;
}

export interface CreateTaskPayloadType {
  task: string;
  assignee: string;
  due_date: string;
}
