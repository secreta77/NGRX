import { createReducer, on } from '@ngrx/store'
import { StatusFilter, Task } from '../models/task.model'
import { User } from '../models/user.model'
import { TaskActions } from './task.actions'

export interface TaskState {
  tasks: Task[]
  users: User[]
  loading: boolean
  error: string | null
  statusFilter: StatusFilter
  searchTerm: string
  selectedUserId: number | null
}

export const initialState: TaskState = {
  tasks: [],
  users: [],
  loading: false,
  error: null,
  statusFilter: 'all',
  searchTerm: '',
  selectedUserId: null,
}

export const taskReducer = createReducer(
  initialState,

  on(
    TaskActions.loadTasks,
    TaskActions.addTask,
    TaskActions.updateTask,
    TaskActions.deleteTask,
    (state) => ({ ...state, loading: true, error: null }),
  ),

  on(TaskActions.selectUser, (state, { userId }) => ({
    ...state,
    selectedUserId: userId,
    loading: true,
    error: null,
  })),

  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    loading: false,
  })),

  on(TaskActions.loadUsersSuccess, (state, { users }) => ({ ...state, users })),

  on(TaskActions.addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [task, ...state.tasks],
    loading: false,
  })),

  on(TaskActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    loading: false,
  })),

  on(TaskActions.deleteTaskSuccess, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((t) => t.id !== id),
    loading: false,
  })),

  on(
    TaskActions.loadTasksFailure,
    TaskActions.loadUsersFailure,
    TaskActions.addTaskFailure,
    TaskActions.updateTaskFailure,
    TaskActions.deleteTaskFailure,
    (state, { error }) => ({ ...state, loading: false, error }),
  ),

  on(TaskActions.setStatusFilter, (state, { status }) => ({ ...state, statusFilter: status })),
  on(TaskActions.setSearchTerm, (state, { term }) => ({ ...state, searchTerm: term })),
)
