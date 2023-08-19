import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"; 
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataRequestService {
  private dataSource = new BehaviorSubject('initial value');
  public data = this.dataSource.asObservable();

  baseUrl='http://localhost:9000/task'
  constructor(private http: HttpClient) {
   }

   updateData(value: any) {
    this.dataSource.next(value);
  }

  getAllTasks():Observable<any>{
    return this.http.get(`${this.baseUrl}/alltasks`);
  }

  createTask(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/newtask`, data)
  }

  deleteTask(id:any):Observable<any>{
    return this.http.delete(`${this.baseUrl}/deleteId/${id}`)
  }

  updateTask(id:any, data:any):Observable<any>{
    return this.http.put(`${this.baseUrl}/update/${id}`, data)
  }
}
