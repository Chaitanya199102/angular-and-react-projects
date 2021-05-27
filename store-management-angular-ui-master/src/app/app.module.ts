import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppListingComponent } from './app-listing/app-listing.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppSideNavComponent } from './app-listing/app-side-nav/app-side-nav.component';
import { AppItemsComponent } from './app-listing/app-items/app-items.component';
import { CategoryFilterComponent } from './app-listing/app-side-nav/category-filter/category-filter.component';
import { AppManageComponent } from './app-manage/app-manage.component';
import { ManageSideNavComponent } from './app-manage/manage-side-nav/manage-side-nav.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { ManageHomeComponent } from './app-manage/manage-home/manage-home.component';
import { ManageInfoComponent } from './app-manage/manage-info/manage-info.component';
import { ActionsTopNavComponent } from './app-manage/manage-info/actions-top-nav/actions-top-nav.component';
import { ActionsAddComponent } from './app-manage/manage-info/actions-add/actions-add.component';

library.add(fas, faBook);
@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppListingComponent,
    AppHomeComponent,
    AppSideNavComponent,
    AppItemsComponent,
    CategoryFilterComponent,
    AppManageComponent,
    ManageSideNavComponent,
    ManageHomeComponent,
    ManageInfoComponent,
    ActionsTopNavComponent,
    ActionsAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
