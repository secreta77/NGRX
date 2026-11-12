import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, of, switchMap } from 'rxjs'
import { TaskService } from '../services/task.service'
import { TaskActions } from './task.actions'

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions)
  private taskService = inject(TaskService)

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError((err) => of(TaskActions.loadTasksFailure({ error: err.message }))),
        ),
      ),
    ),
  )

  selectUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.selectUser),
      switchMap(({ userId }) => {
        const request$ =
          userId === null ? this.taskService.getTasks() : this.taskService.getTasksByUser(userId)
        return request$.pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError((err) => of(TaskActions.loadTasksFailure({ error: err.message }))),
        )
      }),
    ),
  )

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadUsers),
      switchMap(() =>
        this.taskService.getUsers().pipe(
          map((users) => TaskActions.loadUsersSuccess({ users })),
          catchError((err) => of(TaskActions.loadUsersFailure({ error: err.message }))),
        ),
      ),
    ),
  )

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      concatMap(({ task }) =>
        this.taskService.addTask(task).pipe(
          map((created) => TaskActions.addTaskSuccess({ task: created })),
          catchError((err) => of(TaskActions.addTaskFailure({ error: err.message }))),
        ),
      ),
    ),
  )

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      concatMap(({ task }) =>
        this.taskService.updateTask(task).pipe(
          map((updated) => TaskActions.updateTaskSuccess({ task: updated })),
          catchError((err) => of(TaskActions.updateTaskFailure({ error: err.message }))),
        ),
      ),
    ),
  )

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      concatMap(({ id }) =>
        this.taskService.deleteTask(id).pipe(
          map(() => TaskActions.deleteTaskSuccess({ id })),
          catchError((err) => of(TaskActions.deleteTaskFailure({ error: err.message }))),
        ),
      ),
    ),
  )
}
