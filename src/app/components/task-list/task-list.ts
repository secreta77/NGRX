import { DatePipe } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Task, TaskStatus } from '../../models/task.model'
import { TaskActions } from '../../store/task.actions'
import {
  selectError,
  selectFilteredTasks,
  selectLoading,
  selectUsers,
} from '../../store/task.selectors'

@Component({
  imports: [FormsModule, DatePipe],
  selector: 'app-task-list',
  styleUrl: './task-list.scss',
  templateUrl: './task-list.html',
})
export class TaskList {
  private store = inject(Store)

  tasks = this.store.selectSignal(selectFilteredTasks)
  users = this.store.selectSignal(selectUsers)
  loading = this.store.selectSignal(selectLoading)
  error = this.store.selectSignal(selectError)

  editingId = signal<number | null>(null)
  editTitle = ''
  editStatus: TaskStatus = 'pending'

  userName(id: number) {
    const user = this.users().find((u) => u.id === id)
    return user ? user.name : 'User ' + id
  }

  startEdit(task: Task) {
    this.editingId.set(task.id)
    this.editTitle = task.title
    this.editStatus = task.status
  }

  cancelEdit() {
    this.editingId.set(null)
  }

  save(task: Task) {
    if (!this.editTitle.trim()) return
    this.store.dispatch(
      TaskActions.updateTask({
        task: { ...task, title: this.editTitle.trim(), status: this.editStatus },
      }),
    )
    this.editingId.set(null)
  }

  remove(id: number) {
    this.store.dispatch(TaskActions.deleteTask({ id }))
  }

  reload() {
    this.store.dispatch(TaskActions.loadTasks())
  }
}
