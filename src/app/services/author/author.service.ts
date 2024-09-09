import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthorResponse, IAuthor } from '../../models/book/IAuthor';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiUrl='https://localhost:44374/api/Author';
  constructor(private http: HttpClient) {}

  getAuthors(): Observable<AuthorResponse>{
    return this.http.get<AuthorResponse>(`${this.apiUrl}`);
  }
}
