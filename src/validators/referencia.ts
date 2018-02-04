import { FormControl } from '@angular/forms';
 
export class ReferenciaValidator {
 
    static isValid(control: FormControl): any {
 
        if(control.value==undefined){
            return null;
        }
        
        if(isNaN(control.value)){
            return {
                "not a number": true
            };
        }

 
        if(control.value < 0){
            return {
                "negative": true
            };
        }
 
        return null;
    }
 
}