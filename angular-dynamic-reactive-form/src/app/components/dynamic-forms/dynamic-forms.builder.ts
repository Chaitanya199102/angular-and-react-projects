import { TemplateControl, TemplateForm, TemplateGroup } from "./dynamic-forms.model";
import { TemplateValidatorUtils } from "./dynamic-forms.utils";
import { mockFormTemplate } from "./dynamic-forms.mock";

export class TemplateFormsBuilder {

    private form : TemplateForm;
    private groupsStore: Map<string, TemplateGroup>;
    private controlsStore: Map<string, TemplateControl>;
    private apiSource: any | Object | JSON = mockFormTemplate;

    constructor() {
        this.form = new TemplateForm({});
        this.groupsStore = new Map<string, TemplateGroup>();
        this.controlsStore = new Map<string, TemplateControl>();
    }

    public getReactiveForm(): TemplateForm {
        this.createReactiveForm();
        this.addValidations();
        return this.form;
    } 
    
    private createReactiveForm(): void {
        this.apiSource.sections.forEach(section => {
            let templateGroup = new TemplateGroup({}, section.name, section.title);
            this.groupsStore.set(templateGroup.name, templateGroup);

            section.questions.forEach(question => {
                let templateControl = new TemplateControl(question.defaultValue ? question.defaultValue: '');
                Object.assign(templateControl, question);

                templateGroup.questions.push(templateControl);                
                templateGroup.addControl(templateControl.name, templateControl);
                this.controlsStore.set(templateControl.name, templateControl);
            });

            this.form.groups.push(templateGroup);
            this.form.addControl(templateGroup.name, templateGroup);
        });
    }

    private addValidations(): void {
        TemplateValidatorUtils.controlMap = this.controlsStore;   
        this.groupsStore.forEach(group => {
            group.questions.forEach(question => {
                let currentControl = this.controlsStore.get(question.name);
                if(currentControl)
                    currentControl.setValidators(TemplateValidatorUtils.addValidators(question));
            });
        });
    }
}