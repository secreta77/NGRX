import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { TaskActions } from './store/task.actions'
import { TaskFilters } from './components/task-filters/task-filters'
import { TaskForm } from './components/task-form/task-form'
import { TaskList } from './components/task-list/task-list'

@Component({
  selector: 'app-root',
  imports: [TaskFilters, TaskForm, TaskList],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private store = inject(Store)

  ngOnInit() {
    this.store.dispatch(TaskActions.loadUsers())
    this.store.dispatch(TaskActions.loadTasks())
  }
}
