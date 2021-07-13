import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorMessagePipe } from './dynamic-forms-errors.pipe';
import { TemplateFormsBuilder } from './dynamic-forms.builder';

@Component({
  selector: 'app-dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['./dynamic-forms.component.scss']
})
export class DynamicFormsComponent implements OnInit {
  
  private form: FormGroup;
  private templateSource: TemplateFormsBuilder;

  constructor() {
    this.templateSource = new TemplateFormsBuilder();    
    this.form = this.templateSource.getReactiveForm();
  }

  ngOnInit() {}

  onSubmit() {
    console.log('what ever after submit', this.form);
  }

}
