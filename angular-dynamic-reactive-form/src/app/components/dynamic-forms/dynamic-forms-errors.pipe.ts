import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'errorPipe'
})
export class ErrorMessagePipe implements PipeTransform {
    transform(error: any): string {
       if(error && error!=null){
           console.log('Error', error);
           switch(error.key){
                case 'required':
                    return 'Value is Required';
                case 'dependsOnExpression':
                    return (error.value)? error.value : 'Invalid Data';
                default:
                    return 'Invalid Data';
           }
       }
    }   
}