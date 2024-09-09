export interface ICategory {
    categoryId: number;
    categoryName: string;  
  }
export interface CategoryResponse {
    totalCategories: number; // Total books for pagination
    categories: ICategory[];  // List of books
}