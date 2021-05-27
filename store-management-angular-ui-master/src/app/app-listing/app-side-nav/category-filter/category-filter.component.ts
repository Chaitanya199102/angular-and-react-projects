import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {

  @Input() categoryItems: any[];
  constructor() { }

  ngOnInit() {
  }

}
