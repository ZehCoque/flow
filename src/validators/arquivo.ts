import { FormControl } from '@angular/forms';
 
export class ArquivoValidator {
 
  static checkFilenameAvailable(control: FormControl): any {
 
    return new Promise(resolve => {
 
        if(control.value.toLowerCase() === "ensaio1"){
 
          resolve({
            "file name taken": true
          });
 
        } else {
          resolve(null);
        }
        
    });
  }
 
}