import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/interfaces/book';

@Component({
  selector: 'app-app-items',
  templateUrl: './app-items.component.html',
  styleUrls: ['./app-items.component.scss']
})
export class AppItemsComponent implements OnInit {

  @Input() books: Book[];
  constructor() { }

  ngOnInit() {
  }

}
