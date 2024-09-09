import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorResponse, IAuthor } from '../../models/book/IAuthor';
import { BookService } from '../../services/book/book.service';
import { Router } from '@angular/router';
import { AuthorService } from '../../services/author/author.service';
import { CategoryService } from '../../services/category/category.service';
import { CategoryResponse, ICategory } from '../../models/book/ICategory';
import { IBook } from '../../models/book/IBook';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit {


  errorMessage: string = '';
  authors: IAuthor[] = [];
  categories: ICategory[] = [];
  showAuthorInput = false;
  showCategoryInput = false;
  reactiveForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required]),
    coverImageUrl: new FormControl('', Validators.required),
    averageRating: new FormControl('', Validators.required),
    availableBookCount: new FormControl('', Validators.required),
    authorId: new FormControl(),
    authorName: new FormControl('', Validators.required),
    categoryId: new FormControl(),
    categoryName: new FormControl('', Validators.required),
  })
  book = {
    title: '',
    description: '',
    price: 0,
    coverImageUrl: '',
    averageRating: 0,
    availableBookCount: 0,
    authorId: null,
    authorName: '',
    categoryId: null,
    categoryName: ''
  };
  constructor(private authorService: AuthorService,
    private categoryService: CategoryService,
    private bookService: BookService,
    private router: Router,) { }
  ngOnInit(): void {
    this.loadAuthors();
    this.loadCategories();
  }

  loadAuthors() {
    this.authorService.getAuthors().subscribe({
      next: (data: AuthorResponse) => {
        console.log('Data fetched:', data); // Check the console for output
        this.authors = data.authors;
      },
      error: (error) => {
        this.errorMessage = `Error: ${error.status} - ${error.statusText || 'Unknown error'}`;
      }
    });
  }
  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data: CategoryResponse) => {
        console.log('Data fetched:', data); // Check the console for output
        this.categories = data.categories;
      },
      error: (error) => {
        this.errorMessage = `Error: ${error.status} - ${error.statusText || 'Unknown error'}`;
      }
    });
  }

  onAuthorChange() {
    let index = this.authors.findIndex(item => item.authorId == this.authorId?.value)
    if (index !== -1)
      this.reactiveForm.patchValue({
        authorName: this.authors[index].authorName
      })
  }

  onCategoryChange() {
    let index = this.categories.findIndex(item => item.categoryId == this.categoryId?.value)
    if (index !== -1)
      this.reactiveForm.patchValue({
        categoryName: this.categories[index].categoryName
      })
  }




  get title() { return this.reactiveForm.get('title'); }
  get description() { return this.reactiveForm.get('description'); }
  get price() { return this.reactiveForm.get('price'); }
  get coverImageUrl() { return this.reactiveForm.get('coverImageUrl'); }
  get averageRating() { return this.reactiveForm.get('averageRating'); }
  get availableBookCount() { return this.reactiveForm.get('availableBookCount'); }
  get authorId() { return this.reactiveForm.get('authorId'); }
  get authorName() { return this.reactiveForm.get('authorName'); }
  get categoryId() { return this.reactiveForm.get('categoryId'); }
  get categoryName() { return this.reactiveForm.get('categoryName'); }

  onSubmit() {
    if (this.reactiveForm.valid) {
      const formData = this.reactiveForm.value;

      const bookPayload: IBook = {
        bookId: 0,
        title: formData.title || "",
        description: formData.description || "",
        price: Number(formData.price),
        image: this.base64Image,
        averageRating: Number(formData.averageRating),
        availableBookCount: Number(formData.availableBookCount),
        isAvailable: this.availableBookCount ? true : false,
        authorId: formData.authorId !== 'other' ? Number(formData.authorId) : 0,
        authorName: formData.authorName || '',
        categoryId: formData.categoryId !== 'other' ? Number(formData.categoryId) : 0,
        categoryName: formData.categoryName || ''
      };

      // Call the service with the constructed payload
      this.bookService.addBook(bookPayload).subscribe({
        next: (response) => {
          alert(response.title+ " : Added successfully");
          console.log('Book added successfully:', response);
          this.router.navigate(['/books']); // Navigate to book list or another route
        },
        error: (error) => {
          console.error('Error adding book:', error);
        }
      });
    }
    else {
      // Mark all controls as touched to show validation errors
      this.reactiveForm.markAllAsTouched();
    }
  }


  base64Image: string = '';

  convertToBase64(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Read file as Base64 URL

      reader.onload = () => {
        // Get the result as a Data URL
        const result = reader.result as string;

        // Extract the Base64 string by removing the prefix
        const base64String = result.split(',')[1];
        this.base64Image = base64String;

        console.log(this.base64Image); // Log the Base64 string
      };

      reader.onerror = (error) => {
        console.log('Error: ', error); // Handle error if needed
      };
    }
  }
}
