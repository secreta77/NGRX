import { createFeatureSelector, createSelector } from '@ngrx/store'
import { TaskState } from './task.reducer'

export const selectTaskState = createFeatureSelector<TaskState>('tasks')

export const selectTasks = createSelector(selectTaskState, (state) => state.tasks)
export const selectUsers = createSelector(selectTaskState, (state) => state.users)
export const selectLoading = createSelector(selectTaskState, (state) => state.loading)
export const selectError = createSelector(selectTaskState, (state) => state.error)
export const selectStatusFilter = createSelector(selectTaskState, (state) => state.statusFilter)
export const selectSearchTerm = createSelector(selectTaskState, (state) => state.searchTerm)
export const selectSelectedUserId = createSelector(selectTaskState, (state) => state.selectedUserId)

export const selectFilteredTasks = createSelector(
  selectTasks,
  selectStatusFilter,
  selectSearchTerm,
  (tasks, status, term) =>
    tasks.filter(
      (task) =>
        (status === 'all' || task.status === status) &&
        task.title.toLowerCase().includes(term.toLowerCase()),
    ),
)
