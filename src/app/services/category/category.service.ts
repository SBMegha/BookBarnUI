import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {CategoryResponse } from '../../models/book/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl='https://localhost:44374/api/Category';
  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryResponse>{
    return this.http.get<CategoryResponse>(`${this.apiUrl}`);
  }
}

