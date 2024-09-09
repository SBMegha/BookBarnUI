import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook, BookResponse } from '../../models/book/IBook';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }
  apiUrl='https://localhost:44374/api/Books';
  httpClient=inject(HttpClient);

  getBooks(page: number = 1, pageSize: number = 10): Observable<BookResponse> 
  {
    return this.httpClient.get<BookResponse>(`${this.apiUrl}?PageNumber=${page}&PageSize=${pageSize}`);
  }

  getBookById(id: number): Observable<IBook> 
  {
    return this.httpClient.get<IBook>(`${this.apiUrl}/${id}`);
  }


  searchBooks(query: string): Observable<{ books: IBook[], totalBooks: number }> {
    return this.httpClient.get<{ books: IBook[], totalBooks: number }>(`${this.apiUrl}/search?query=${query}`);
  }

   // Fetch books with category filter
   filterBooksByCategory(categoryId: number, pageNumber: number = 1, pageSize: number = 2): Observable<BookResponse> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    // https://localhost:44374/api/Books/category/1?PageNumber=1&PageSize=10
    return this.httpClient.get<BookResponse>(`${this.apiUrl}/category/${categoryId}`, { params });
  }


  // getBooks(page: number = 1, pageSize: number = 10): Observable<Book[]> {
  //   return this.httpClient.get<Book[]>(`${this.apiUrl}?PageNumber=${page}&PageSize=${pageSize}`);
  // }

  // getBookById(id: number): Observable<Book> {
  //   return this.httpClient.get<Book>(`${this.apiUrl}/books/${id}`);
  // }

  // searchBooks(query: string): Observable<Book[]> {
  //   return this.httpClient.get<Book[]>(`${this.apiUrl}/books?title_like=${query}`);
  // }

  // filterBooksByCategory(categoryId: number): Observable<Book[]> {
  //   return this.httpClient.get<Book[]>(`${this.apiUrl}/books?categoryId=${categoryId}`);
  // }

  //===============================================================================================

  addBook(book: IBook): Observable<IBook> {
    return this.httpClient.post<IBook>(`${this.apiUrl}`, book);
  }
}
