import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent 
{
  @Input() totalItems: number = 0; // Initialize with default value
  @Input() itemsPerPage: number = 10; // Initialize with default value
  @Input() currentPage: number = 1; // Initialize with default value
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  // Calculate total pages based on totalItems and itemsPerPage
  get totalPages(): number[] {
    return Array.from({ length: Math.ceil(this.totalItems / this.itemsPerPage) }, (_, i) => i + 1);
  }

  // Emit page change event when a new page is selected
  changePage(page: number): void {
    this.pageChanged.emit(page);
  }
}
