import { FormControl, AbstractControl } from '@angular/forms';
 
export class HomeInputValidator {
    
static isValid(c: AbstractControl) {
    // console.log(c.value)
        if (c.value == undefined){
            return null;
        }

        if (isNaN(c.value)){
            return {
                'not a number': true
            };
        }

        if (c.value < 0){
            return {
                "negative": true
            }
        }
    }
}