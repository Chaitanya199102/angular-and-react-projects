import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee, EmployeeState } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-observer',
  templateUrl: './observer.component.html',
  styleUrls: ['./observer.component.scss']
})
export class ObserverComponent implements OnInit, OnDestroy {

  subscription:Subscription;
  employeeState: EmployeeState;

  constructor(private employeeService: EmployeeService) {
    this.subscription =  this.employeeService
      .getState()
      .subscribe(data => this.employeeState = data);
  }

  ngOnInit() {
    setTimeout(() => {
      let aipState = {
        employee: undefined,
        loading: false        
      } as EmployeeState;
      this.employeeService.mergeState(aipState);      
    }, 1000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
