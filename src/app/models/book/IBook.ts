// Book interface for individual book objects
export interface IBook {
  bookId: number;
  title: string;
  description: string;
  price: number;
  image: string; 
  averageRating: number;
  availableBookCount: number; 
  isAvailable?:boolean;
  authorId?: number; 
  authorName: string; 
  categoryId?: number;
  categoryName: string;
}
  export interface BookResponse {
    totalBooks: number; // Total books for pagination
    books: IBook[];  // List of books
  } 