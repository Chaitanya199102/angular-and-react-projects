import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAcsRoutingModule } from './app-acs-routing.module';
import { AcsComponent } from './acs.component';

@NgModule({
  declarations: [AcsComponent],
  imports: [
    CommonModule,
    AppAcsRoutingModule
  ]
})
export class AppAcsModule { }
