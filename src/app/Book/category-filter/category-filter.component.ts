import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../Services/category/category.service';
import { Category } from '../../Models/ICategory';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css'
})
export class CategoryFilterComponent implements OnInit
{
  categoryService=inject(CategoryService)
  categories:Category[]=[]
  errorMessage: string = '';

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => { this.categories = data; },
      error: (error) => { this.errorMessage = error.statusText; }
    });
  }
}
