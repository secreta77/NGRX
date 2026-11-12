import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideStore } from '@ngrx/store'
import { taskReducer } from '../../store/task.reducer'
import { TaskForm } from './task-form'

describe('TaskForm', () => {
  let component: TaskForm
  let fixture: ComponentFixture<TaskForm>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskForm],
      providers: [provideStore({ tasks: taskReducer })],
    }).compileComponents()

    fixture = TestBed.createComponent(TaskForm)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
