import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideStore } from '@ngrx/store'
import { taskReducer } from '../../store/task.reducer'
import { TaskList } from './task-list'

describe('TaskList', () => {
  let component: TaskList
  let fixture: ComponentFixture<TaskList>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskList],
      providers: [provideStore({ tasks: taskReducer })],
    }).compileComponents()

    fixture = TestBed.createComponent(TaskList)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
