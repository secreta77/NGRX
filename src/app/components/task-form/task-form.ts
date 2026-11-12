import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { TaskStatus } from '../../models/task.model'
import { TaskActions } from '../../store/task.actions'
import { selectUsers } from '../../store/task.selectors'

@Component({
  imports: [FormsModule],
  selector: 'app-task-form',
  styleUrl: './task-form.scss',
  templateUrl: './task-form.html',
})
export class TaskForm {
  private store = inject(Store)

  users = this.store.selectSignal(selectUsers)

  userId = ''
  title = ''
  dueOn = ''
  status: TaskStatus = 'pending'

  add() {
    if (!this.userId || !this.title.trim() || !this.dueOn) return
    this.store.dispatch(
      TaskActions.addTask({
        task: {
          user_id: Number(this.userId),
          title: this.title.trim(),
          due_on: new Date(this.dueOn).toISOString(),
          status: this.status,
        },
      }),
    )
    this.title = ''
    this.dueOn = ''
  }
}
