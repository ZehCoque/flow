import { FormControl } from '@angular/forms';
import { UserDataProvider } from '../providers/user-data/user-data';

export class HomeInputValidator {
    
    static isValid(control: FormControl,
        userdata: UserDataProvider,
        referencia: number,
        erroAdm: number): any {

        userdata.getData().then(data =>{
            console.log("hi")
            referencia = data.titulo;
            erroAdm = data.erroAdm;
        });
        
        console.log("hello")
        if((control.value-referencia)/referencia < erroAdm){
            console.log("menor");
            return {
                "menor": true
            };
        }

        if((control.value-referencia)/referencia > erroAdm){
            console.log("maior");
            return {
                "maior": true
            };
        }

        if(control.value==undefined){
            return null;
        }

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
 
        if(control.value < 0){
            return {
                "negative": true
            };
        }
 
        if (control.value > 100){
            return {
                "not realistic": true
            };
        }
 
        return null;
    }
 
}
