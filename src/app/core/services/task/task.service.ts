import { Injectable } from '@angular/core';
import { Task } from 'src/app/feature/models/task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl = 'assets/data/tasks.json';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  search(items: Task[], text: any): Task[] {
    const searchText: string[] = text.split(' ');
    return items.filter((item) => {
      return searchText.every((el) => {
        return (
          item.title.toLowerCase().indexOf(el.toLowerCase()) > -1 ||
          item.instructions.toLowerCase().indexOf(el.toLowerCase()) > -1
        );
      });
    });
  }
}
