import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { StatusFilter } from '../../models/task.model'
import { TaskActions } from '../../store/task.actions'
import {
  selectSearchTerm,
  selectSelectedUserId,
  selectStatusFilter,
  selectUsers,
} from '../../store/task.selectors'

@Component({
  imports: [],
  selector: 'app-task-filters',
  styleUrl: './task-filters.scss',
  templateUrl: './task-filters.html',
})
export class TaskFilters {
  private store = inject(Store)

  users = this.store.selectSignal(selectUsers)
  status = this.store.selectSignal(selectStatusFilter)
  search = this.store.selectSignal(selectSearchTerm)
  userId = this.store.selectSignal(selectSelectedUserId)

  changeStatus(value: string) {
    this.store.dispatch(TaskActions.setStatusFilter({ status: value as StatusFilter }))
  }

  changeSearch(value: string) {
    this.store.dispatch(TaskActions.setSearchTerm({ term: value }))
  }

  changeUser(value: string) {
    const userId = value === '' ? null : Number(value)
    this.store.dispatch(TaskActions.selectUser({ userId }))
  }
}
