import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/app/feature/models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  //
  baseUrl = 'assets/data/projects.json';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }

  findById(id: number): Observable<Project> {
    // TODO: need to implement
    return this.http.get<Project>(this.baseUrl + id);
  }

  create(project: Project): Observable<Project> {
    // TODO: need to implement
    return this.http.post<Project>(this.baseUrl, project);
  }

  update(project: Project): Observable<Project> {
    // TODO: need to implement
    return this.http.put<Project>(this.baseUrl + project.id, project);
  }

  delete(id: number): Observable<Project> {
    // TODO: need to implement
    return this.http.delete<Project>(this.baseUrl + id);
  }

  search(items: Project[], text: any): Project[] {
    const searchText: string[] = text.split(' ');
    return items.filter((item) => {
      return searchText.every((el) => {
        return (
          item.name.toLowerCase().indexOf(el.toLowerCase()) > -1 ||
          item.number.toLowerCase().indexOf(el.toLowerCase()) > -1 ||
          item.author.toLowerCase().indexOf(el.toLowerCase()) > -1 ||
          item.reviewer.toLowerCase().indexOf(el.toLowerCase()) > -1 ||
          item.type.toLowerCase().indexOf(el.toLowerCase()) > -1 ||
          item.category.toLowerCase().indexOf(el.toLowerCase()) > -1
        );
      });
    });
  }
}
