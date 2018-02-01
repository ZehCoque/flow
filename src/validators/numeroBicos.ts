import { FormControl } from '@angular/forms';
 
export class NumeroBicosValidator {
 
    static isValid(control: FormControl): any {
 
        if(isNaN(control.value)){
            return {
                "not a number": true
            };
        }
 
        if(control.value % 1 !== 0){
            return {
                "not a whole number": true
            };
        }
 
        if(control.value < 1){
            return {
                "too low": true
            };
        }
 
        if (control.value > 200){
            return {
                "not realistic": true
            };
        }
 
        return null;
    }
 
}