import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './Book/book-list/book-list.component';
import { BookDetailComponent } from './Book/book-detail/book-detail.component';
import { AddBookComponent } from './Book/add-book/add-book.component';

//Mention correct urls for routing of the pages
export const routes: Routes = [
    {path:'',component:HomeComponent,title:"BookBarn"},
    {path:'cart',component:CartComponent,title:"Cart"},
    { path: 'books', component: BookListComponent,title:"Books" },
    { path: 'books/:id', component: BookDetailComponent,title:"BookDetails" },
    { path: 'addBook', component: AddBookComponent,title:"Add Book" },
    { path: '**', component: HomeComponent,title:"404" },
];
