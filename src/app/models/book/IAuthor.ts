export interface IAuthor {
    authorId: number;
    authorName:string;
  }

  export interface AuthorResponse {
    totalAuthors: number; // Total books for pagination
    authors: IAuthor[];  // List of books
  } 