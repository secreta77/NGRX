import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { StatusFilter, Task } from '../models/task.model';
import { User } from '../models/user.model';

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Load Tasks': emptyProps(),
    'Load Tasks Success': props<{ tasks: Task[] }>(),
    'Load Tasks Failure': props<{ error: string }>(),

    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),

    'Add Task': props<{ task: Omit<Task, 'id'> }>(),
    'Add Task Success': props<{ task: Task }>(),
    'Add Task Failure': props<{ error: string }>(),

    'Update Task': props<{ task: Task }>(),
    'Update Task Success': props<{ task: Task }>(),
    'Update Task Failure': props<{ error: string }>(),

    'Delete Task': props<{ id: number }>(),
    'Delete Task Success': props<{ id: number }>(),
    'Delete Task Failure': props<{ error: string }>(),

    'Set Status Filter': props<{ status: StatusFilter }>(),
    'Set Search Term': props<{ term: string }>(),
    'Select User': props<{ userId: number | null }>(),
  },
});