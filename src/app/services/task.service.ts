import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL, TOKEN } from '../config';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient)

  private headers = new HttpHeaders({
    Authorization: `Bearer ${TOKEN}`
  })

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${API_URL}/todos`)
  }

  getTasksByUser(userId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${API_URL}/users/${userId}/todos`)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users`)
  }

  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(`${API_URL}/todos`, task, { headers: this.headers })
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${API_URL}/todos/${task.id}`, task, { headers: this.headers })
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/todos/${id}`, { headers: this.headers })
  }
}
