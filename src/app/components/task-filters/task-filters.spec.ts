import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideStore } from '@ngrx/store'
import { taskReducer } from '../../store/task.reducer'
import { TaskFilters } from './task-filters'

describe('TaskFilters', () => {
  let component: TaskFilters
  let fixture: ComponentFixture<TaskFilters>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFilters],
      providers: [provideStore({ tasks: taskReducer })],
    }).compileComponents()

    fixture = TestBed.createComponent(TaskFilters)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
