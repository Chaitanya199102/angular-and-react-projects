import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acs',
  templateUrl: './acs.component.html',
  styleUrls: ['./acs.component.scss']
})
export class AcsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  authenticate() {
    console.log('authenticating user using acs');
  }

}
