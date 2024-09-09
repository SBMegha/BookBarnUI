import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from "../pagination/pagination.component";
import { BookService } from '../../services/book/book.service';
import { CategoryService } from '../../services/category/category.service';
import { IBook, BookResponse } from '../../models/book/IBook';
import { ICategory } from '../../models/book/ICategory';
import { AddBookComponent } from "../add-book/add-book.component";
import { CommonService } from '../../utils/common.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PaginationComponent, AddBookComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit 
{
  books: IBook[] = [];
  categories: ICategory[] = [];
  errorMessage: string = '';
  constructor(private categoryService:CategoryService, private bookService: BookService, private router: Router, private commService :CommonService) {}
  currentPage = 1;
  booksPerPage = 2;
  //totalPages: number[] = [];
  totalBooks = 0;
  totalpages=0;
  selectedCategory: number=0;
 
  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories();
  }

  loadBooks(page: number = 1, pageSize: number = 2): void 
  {
    this.bookService.getBooks(page, pageSize).subscribe({
      next: (data: BookResponse) => {
        console.log('Data fetched:', data); // Check the console for output
        this.books = data.books;
        this.books.map(book=>book.image=this.commService.detectMimeTypeAndPrepend(book.image));
        this.totalBooks = data.totalBooks;
        this.totalpages=Math.ceil( this.totalBooks/pageSize);
        this.currentPage=page;
      },
      error: (error) => {
        this.errorMessage = `Error: ${error.status} - ${error.statusText || 'Unknown error'}`;
      }
    });
  }
  
  

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.categories;
      },
      error: (error) => {
        this.errorMessage = `Error: ${error.statusText || 'Unknown error'}`;
      }
    });
  }

  searchBooks(query: string): void {
    this.bookService.searchBooks(query).subscribe({
      next: (data) => {
        this.books = data.books;
        this.totalBooks = data.totalBooks;
        //this.updatePagination();
      },
      error: (error) => {
        this.errorMessage = `Error: ${error.statusText || 'Unknown error'}`;
      }
    });
  }

  filterBooksByCategory(categoryId: number,pageNumber: number = 1, pageSize: number = 2): void {
    this.reset();
    console.log(categoryId);
    if (categoryId) 
    {
      this.bookService.filterBooksByCategory(categoryId, pageNumber, pageSize).subscribe({
        next: (data) => {
          this.books = data.books;
          this.books.map(book=>book.image=this.commService.detectMimeTypeAndPrepend(book.image));
          this.totalBooks = data.totalBooks;
          // this.totalpages=Math.ceil( this.totalBooks/booksPerPage);
          // this.currentPage=page;
          //this.updatePagination(); // Custom method to update pagination controls
        },
        error: (error) => {
          this.errorMessage = `Error: ${error.statusText || 'Unknown error'}`;
        }
      });
    } else {
      this.loadBooks(); // Load all books if no category is selected
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    if (this.selectedCategory) {
      this.filterBooksByCategory(this.selectedCategory); // Filter with selected category
    } else {
      this.loadBooks(); // Load books for the selected page without filtering
    }
  }

  // updatePagination(): void {
  //   const totalPages = Math.ceil(this.totalBooks / this.booksPerPage); // Calculate total pages
  //   this.totalPages = Array.from({ length: totalPages }, (_, i) => i + 1); // Create array [1, 2, 3, ...]
  // }

  // Get total pages for pagination
  // getTotalPages(): number[] {
  //   return Array(Math.ceil(this.totalBooks / this.booksPerPage))
  //     .fill(0)
  //     .map((_, i) => i + 1);
  // }

  AddBook() {
    this.router.navigate(['/addBook']);
  }
    
  // loadBooks(): void 
  // {
  //   this.bookService.getBooks().subscribe({
  //     next: (data) => {this.books = data },
  //     error: (error) => {
  //       this.errorMessage = `Error: ${error.status} - ${error.statusText || 'Unknown error'}`;
  //     }
  //   });
  // }

  // loadBooks(): void 
  // {
  //     // Fetch books on component initialization
  //   this.bookService.getBooks(1, 10).subscribe({
  //     next: (response) => { this.books = response.books; }, // Assign the books from the response   
  //     error: (error) => { this.errorMessage = error.message; }
  //   });
  // }

  // loadCategories(): void 
  // {
  //   this.categoryService.getCategories().subscribe({
  //     next: (data) => { this.categories = data; },
  //     error: (error) => { this.errorMessage = error.statusText; }
  //   });
  // }

  // searchBooks(query: string): void 
  // {
  //   this.bookService.searchBooks(query).subscribe({
  //     next: (data) => { this.books = data; },
  //     error: (error) => { this.errorMessage = error.statusText; }
  //   });
  // }

  // filterBooksByCategory(categoryId: number): void 
  // {
  //   if (categoryId) {
  //     this.bookService.filterBooksByCategory(categoryId).subscribe({
  //       next: (data) => { this.books = data; },
  //       error: (error) => { this.errorMessage = error.statusText; }
  //     });
  //   } else {
  //     this.loadBooks(); // Reload all books if no category is selected
  //   }
  // }
  
  addToWishlist(book: IBook): void {
    // Logic to add the book to the wishlist
    console.log(`${book.title} added to wishlist`);
  }

  buyNow(book: IBook): void {
    // Logic to buy the book (could navigate to a checkout page)
    console.log(`Proceed to buy ${book.title}`);
  }

  reset(){
    this.books=[];
    this.currentPage=1;
    this.totalBooks = 0;
    this.totalpages=0;
  }
}




  

 

  

  

  

  