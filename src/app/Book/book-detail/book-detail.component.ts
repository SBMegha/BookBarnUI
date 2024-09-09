import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../../services/book/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IBook } from '../../models/book/IBook';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  book: IBook | null = null;
  errorMessage: string = '';
  private bookService = inject(BookService);
  private router=inject(Router)
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const bookId = Number(params.get('id'));
      this.loadBook(bookId);
    });
  }

  loadBook(id: number): void {
    this.bookService.getBookById(id).subscribe({
      next: (book: IBook) => this.book = book,
      error: (error) => this.errorMessage = `Error: ${error.status} - ${error.statusText || 'Unknown error'}`,
    });
  }

  goBack(): void {
    this.router.navigate(['/books']);
  }
}