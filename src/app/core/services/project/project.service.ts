import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/app/feature/models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  //
  baseUrl = '';

  constructor(private http: HttpClient) {}

  find(): Observable<Project> {
    return this.http.get<Project>(this.baseUrl);
  }

  findById(id: number): Observable<Project> {
    return this.http.get<Project>(this.baseUrl + id);
  }

  create(project: Project): Observable<Project> {
    return this.http.post<Project>(this.baseUrl, project);
  }

  update(project: Project): Observable<Project> {
    return this.http.put<Project>(this.baseUrl + project.id, project);
  }

  delete(id: number): Observable<Project> {
    return this.http.delete<Project>(this.baseUrl + id);
  }
}
