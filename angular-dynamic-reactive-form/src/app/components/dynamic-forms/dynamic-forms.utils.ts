import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";
import { TemplateControl, TemplateControlValidator } from "./dynamic-forms.model";

export abstract class TemplateValidatorUtils {

    public static controlMap: Map<string, TemplateControl>;

    /**
     * @param question - A Template Control on which validations needs to be added
     * @returns - Array of validator Functions (custom and angular provided)
     */
    public static addValidators(question: TemplateControl): Array<ValidatorFn> {
        if(question.validators==undefined) return;
        if(question.validatorsStore == undefined) question.validatorsStore = new Map<string, ValidatorFn>();

        let angularValidators: Array<ValidatorFn> = [];
        question.validators.forEach(validator => {
            this.addValidator(question, validator, angularValidators);
        });
        return angularValidators;
    }

    /**
     * @param question - A Template Control which requires validation support
     * @param validator - Validation Definition for Template Control
     * @param validatorsArray - Form Control associated validation array.
     * @returns void | none
     */
    public static addValidator(question: TemplateControl, validator: TemplateControlValidator, validatorsArray: Array<ValidatorFn>) {
        switch(validator.name) {
            case 'required':
                let validationFn = (JSON.parse(validator.value)) ? Validators.required : undefined;
                if(validationFn) {
                    validatorsArray.push(Validators.required);
                    question.validatorsStore.set('required', validationFn);
                }
                return validatorsArray;
            case 'dependsOn':
                //adding normal depends on validation
                let dependsOnValidationFn = this.dependsOn(question, validator);
                question.validatorsStore.set('dependsOn-'+validator.value, dependsOnValidationFn);
                validatorsArray.push(dependsOnValidationFn);

                //adding cross validation from dependent source
                let dependentQuestion = this.controlMap.get(validator.value);
                let dependentFormControl = this.controlMap.get(validator.value);
                let crossValidationFn = this.notify(question.name);

                if(dependentQuestion.validatorsStore == undefined) dependentQuestion.validatorsStore = new Map<string, ValidatorFn>();
                dependentQuestion.validatorsStore.set('notify-'+question.name, crossValidationFn);

                //refresh the source control
                dependentFormControl.clearValidators();
                dependentFormControl.setValidators(Array.from(dependentQuestion.validatorsStore.values()));
                dependentFormControl.updateValueAndValidity();

                //add to adviceory store; This can be helpful when you remove a form control or group from current form
                if(question.adviceValidatorStore == undefined) question.adviceValidatorStore = new Map<string, string>();
                question.adviceValidatorStore.set(dependentQuestion.name, 'notify-'+question.name);

                return validatorsArray;
            default:
                return validatorsArray;
        }
    }

   /**
    * @param dpendentQuestionName
    * @returns - A notify validation function on source which invokes dependent on source change
    * Notify is like a callback added on source to notify dependent for a change in source value
    * This is added in the interest to provide the corss validation support or bi-directional
    * support.
    */
    public static notify(dpendentQuestionName: string): ValidatorFn {
        return (currentControl: AbstractControl): { [key: string]: any } => {
            let dependentControl = this.controlMap.get(dpendentQuestionName);
            dependentControl.markAsTouched();
            dependentControl.updateValueAndValidity();
            return {};
        }
    }

    /**
     * @param question - A Template Control which is dependent on other Source or Template Control
     * @param validator - A validator definition which describes depends on relation between source and destination 
     * @returns Validator Function to which evalauates and validates on basis of source value and expression
     */
    public static dependsOn(question: TemplateControl, validator: TemplateControlValidator): ValidatorFn {
        return (currentControl: AbstractControl): { [key: string]: any } => {
            let sourceControl = this.controlMap.get(validator.value);
            if (sourceControl.value == "") 
                return;

            let dependsOnCondition = eval(new Function(validator.value, 'return `' + validator.expression + '`;')(sourceControl.value));
            if (dependsOnCondition) {
                let temp = {};
                temp['dependsOnExpression'] = 'Age must be greater than 18.';
                return temp;
            }
        }
    }
}