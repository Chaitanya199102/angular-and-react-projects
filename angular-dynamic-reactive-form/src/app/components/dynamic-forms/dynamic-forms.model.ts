import { AbstractControl, FormControl, FormGroup, ValidatorFn} from "@angular/forms";

export class TemplateForm extends FormGroup {
    name?: string;
    groups: Array<TemplateGroup>;

    constructor(controls: {[key: string]: AbstractControl}) {
        super(controls);
        this.groups = [];
    }
}

export class TemplateGroup extends FormGroup {
    name: string;
    title: string;
    order: number;
    questions: Array<TemplateControl>;

    constructor(controls: {[key: string]: AbstractControl}, name: string, title: string){
        super(controls);
        this.name = name;
        this.title = title;
        this.questions = [];
    }
}

export class TemplateControl extends FormControl {
    id: number;
    name: string;
    title: string;
    type: string;
    options?: TemplateOptions;
    defaultValue?: string;
    dependsOn?: string;
    validators?: Array<TemplateControlValidator>;
    validatorsStore?: Map<string, ValidatorFn>;
    adviceValidatorStore?: Map<string, string>;

    constructor(formState: any){
        super(formState);
    }
}

export class TemplateOptions {
    default?: string;
    options?: Array<string>;
    apiSource?: string;
    source: string;
}

/** A custom definition of the Validaton,
 *  which can be used to addValidations on TemplateControl */
export class TemplateControlValidator {
    name: string;
    value: string;
    expression?: string;
}
