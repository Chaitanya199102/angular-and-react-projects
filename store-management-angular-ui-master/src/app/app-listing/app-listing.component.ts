import { Component, OnInit } from '@angular/core';
import { BookListingService } from '../services/book-listing.service';
import { Book } from '../interfaces/book';
import { AppGenreService } from '../services/genre/app-genre.service';
import { AppPublisherService } from '../services/publisher/app-publisher.service';
import { Category } from '../models/Category';

@Component({
  selector: 'app-app-listing',
  templateUrl: './app-listing.component.html',
  styleUrls: ['./app-listing.component.scss']
})
export class AppListingComponent implements OnInit {

  books: Book[];
  filterCategories: Category[] = [];
  constructor(private bookListingService: BookListingService,
    private appGenreService: AppGenreService,
    private appPublisherService: AppPublisherService) { }

  ngOnInit() {
    this.getBooks();
    this.getGenre();
    this.getPublishers();
    console.log(this.filterCategories);
  }

  public getBooks() {
    this.bookListingService.getBooks()
      .subscribe(
        books => {
          console.log(books);
          this.books = books;
        },
        error => console.log(error)
      );
  }

  public getGenre() {
    this.appGenreService.getGenre()
      .subscribe(
        genre => {
          console.log(genre);
          this.filterCategories.push(new Category('Genre', genre));
        },
        error => console.log(error)
      );
  }

  public getPublishers() {
    this.appPublisherService.getPublishers()
      .subscribe(
        publishers => {
          console.log(publishers);
          this.filterCategories.push(new Category('Publishers', publishers));
        },
        error => console.log(error)
      );
  }

}
