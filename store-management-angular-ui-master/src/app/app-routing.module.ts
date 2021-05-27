import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppListingComponent } from './app-listing/app-listing.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppManageComponent } from './app-manage/app-manage.component';
import { ManageInfoComponent } from './app-manage/manage-info/manage-info.component';
import { ManageHomeComponent } from './app-manage/manage-home/manage-home.component';
import { ActionsAddComponent } from './app-manage/manage-info/actions-add/actions-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: '../app/app-login/app-login.module#AppLoginModule'},
  { path: 'acs', loadChildren: '../app/app-acs/app-acs.module#AppAcsModule' },
  { path: 'home', component: AppHomeComponent},
  { path: 'books-inventory', component: AppListingComponent},
  { path: 'manage-information', component: AppManageComponent,
    children: [
      { path: '', component: ManageHomeComponent, outlet: 'manage'},
      { path: ':entity', component: ManageInfoComponent, outlet: 'manage',
        children: [
          { path: 'add-info/:entity', component: ActionsAddComponent, outlet: 'manageAction'}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
