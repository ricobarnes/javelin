import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Author } from 'src/app/feature/models/author';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  baseUrl = 'assets/data/authors.json';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl);
  }

  search(items: Author[], text: any): Author[] {
    const searchText: string[] = text.split(' ');
    return items.filter((item) => {
      return searchText.every((el) => {
        return (
          item.firstName.toLowerCase().indexOf(el.toLowerCase()) > -1 ||
          item.lastName.toLowerCase().indexOf(el.toLowerCase()) > -1
        );
      });
    });
  }
}
