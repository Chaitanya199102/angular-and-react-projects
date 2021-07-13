import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DndDirective } from './direcitves/dnd.directive';
import { ProgressComponent } from './components/progress/progress.component';
import { DynamicFormsComponent } from './components/dynamic-forms/dynamic-forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagePipe } from './components/dynamic-forms/dynamic-forms-errors.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DndDirective,
    ProgressComponent,
    ErrorMessagePipe,
    DynamicFormsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: Window, useValue: window }],
  bootstrap: [AppComponent]
})
export class AppModule { }
