import { Component, OnInit } from '@angular/core';
import { Map } from './map';
import { Entry } from './entry';
import { SearchFilterPipe } from './searchFilter.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  private paramsArray: Array<string> = ['Abstract', 'Alimony' , 'Boil', 'Chicken', 'Sample', 'Marriage', 'Vandana', 'Text'];
  public map: Map;
  public searchString = 'A';

  ngOnInit() {
    // Load all the values from array
    this.map = new Map();
    this.paramsArray.forEach(element => {
      console.log('contains', this.map.contains(element.substring(0, 1)));
      this.map.put(element.substring(0, 1), element);
    });
    console.log(this.map);
  }

  getDictionary(): Array<Entry> {
    return this.map.entries;
  }

  addtoDiv(param: string){
    console.log('param to be added', param);
  }

  dragStart(event: any, param: string){
    console.log('element being dragged', param);
    event.dataTransfer.setData('text', param);
  }

  drop(event: any, param: string){
    console.log('element being dropped', event.dataTransfer.getData('text')); 
    event.target.append(event.dataTransfer.getData('text'));
  }

  allowDrop(event:any) {
    event.preventDefault();
  }

}

