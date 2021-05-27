import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit() {
  }

  customLogin() {
    console.log('custom login');
  }

  acsLogin() {
    console.log('acs login clicked');
    const windowRefrence = this.commonService.getNativeWindow();
    windowRefrence.open('/acs', 'ACS Login',
      'width=500,height=400,toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no');
  }

}
