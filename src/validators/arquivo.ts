import { FormControl } from '@angular/forms';
 
export class ArquivoValidator {
 
  static checkFilename(control: FormControl): any {
 
    return new Promise(resolve => {
 
        if(control.value.toLowerCase() === "Ensaio1"){
 
          resolve({
            "file name taken": true
          });
 
        } else {
          resolve(null);
        }
 
    });
  }
 
}