export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: number;
  user_id: number;
  title: string;
  due_on: string;
  status: TaskStatus;
}

export type StatusFilter = 'all' | TaskStatus;

