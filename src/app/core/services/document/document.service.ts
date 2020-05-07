import { Injectable } from '@angular/core';
import { Document } from 'src/app/feature/models/document';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  baseUrl = 'assets/data/documents.json';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Document[]> {
    return this.http.get<Document[]>(this.baseUrl);
  }

  search(items: Document[], text: any): Document[] {
    const searchText: string[] = text.split(' ');
    return items.filter((item) => {
      return searchText.every((el) => {
        return (
          item.title.toLowerCase().indexOf(el.toLowerCase()) > -1 ||
          item.description.toLowerCase().indexOf(el.toLowerCase()) > -1
        );
      });
    });
  }
}
