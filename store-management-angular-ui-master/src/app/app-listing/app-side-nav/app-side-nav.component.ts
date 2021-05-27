import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-app-side-nav',
  templateUrl: './app-side-nav.component.html',
  styleUrls: ['./app-side-nav.component.scss']
})
export class AppSideNavComponent implements OnInit {

  @Input() filters: Category[];
  constructor() { }

  ngOnInit() {
  }

}
