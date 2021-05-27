import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcsComponent } from './acs.component';

const routes: Routes = [
  {path: '', component: AcsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAcsRoutingModule { }
