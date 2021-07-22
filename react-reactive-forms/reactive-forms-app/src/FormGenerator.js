export class FormGeneratorUtil {
    
    TextInput = ({ handler, touched, hasError, meta }) => (
        <div>
            <input placeholder={`Enter ${meta.label}`} {...handler()}/>
            <span>
                {touched
                && hasError("required")
                && `${meta.label} is required`}
            </span>
        </div>  
    );

    CheckBox = ({ handler }) => (
        <div>
          <input {...handler("checkbox")}/>
        </div>
    );

    getPartial(type) {
        switch(type) {
            case 'text':
                return this.TextInput;
            case 'checkbox':
                return this.CheckBox;
            default: 
                return this.TextInput;
        }
    }
}